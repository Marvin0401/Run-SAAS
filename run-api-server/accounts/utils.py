import requests
import json
import re
import os
import datetime
import sys
from zoho.models import ZohoApi

customer_url = "https://subscriptions.zoho.com/api/v1/customers"


def get_zoho_oauthtoken(refresh_token):
    url = "https://accounts.zoho.com/oauth/v2/token"
    payload_data = {
        'refresh_token': refresh_token or '1000.1e64df9aadd5d221aa9ec2c91aa183ce.87edcb4352502f66b3eecfe2a62f5adf',
        'client_id': os.environ.get('ZOHO_CLIENT_ID') or '1000.1V53PKDTQTAZ867BXZ2ITAEXY1EHZM',
        'client_secret': os.environ.get(
            'ZOHO_CLIENT_SECRET') or '35c91690768c95bc7dd11f59119d638e9975386248',
        'redirect_uri': 'https://www.google.com',
        'grant_type': 'refresh_token'}
    zoho_api = ZohoApi()
    try:
        zoho_data = ZohoApi.objects.filter(refresh_token=refresh_token).first()
        if zoho_data:
            if _is_expired(zoho_data.expires_at):
                response = requests.request("POST", url, data=payload_data)
                response = json.loads(response.text)
                zoho_data.access_token = response['access_token']
                zoho_data.refresh_token = refresh_token or os.environ.get('ZOHO_REFRESH_TOKEN')
                zoho_data.client_secret = os.environ.get(
                    'ZOHO_CLIENT_SECRET') or '35c91690768c95bc7dd11f59119d638e9975386248'
                zoho_data.client_id = os.environ.get('ZOHO_CLIENT_ID') or '1000.1V53PKDTQTAZ867BXZ2ITAEXY1EHZM'
                zoho_data.expires_at = _get_expires_at(response['expires_in'])
                zoho_data.save()
                return zoho_data.access_token
            else:
                return zoho_data.access_token
        else:
            response = requests.request("POST", url, data=payload_data)
            response = json.loads(response.text)
            zoho_api.access_token = response['access_token']
            zoho_api.refresh_token = refresh_token or os.environ.get('ZOHO_REFRESH_TOKEN')
            zoho_api.client_secret = os.environ.get(
                'ZOHO_CLIENT_SECRET') or '35c91690768c95bc7dd11f59119d638e9975386248'
            zoho_api.client_id = os.environ.get('ZOHO_CLIENT_ID') or '1000.1V53PKDTQTAZ867BXZ2ITAEXY1EHZM'
            zoho_api.expires_at = _get_expires_at(response['expires_in'])
            zoho_api.save()
            return response['access_token']
    except Exception as e:
        print(e)
        return None


def create_customer_zoho(first_name, last_name, email, phone, company, website):
    access_token = get_zoho_oauthtoken(os.environ.get('ZOHO_REFRESH_TOKEN'))
    payload = json.dumps({
        "display_name": email.split('@')[0],
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "company_name": company,
        "phone": phone,
        "mobile": phone,
        "website": website or ""
    })

    headers = {
        'X-com-zoho-subscriptions-organizationid': os.environ.get('ORGANIZATION_ID') or '761647033',
        'Authorization': 'Zoho-oauthtoken {token}'.format(
            token=access_token),
        'Content-Type': 'application/json'}
    print(headers)
    print(payload)
    response = requests.request("POST", customer_url, data=payload, headers=headers)
    print(response.json())
    return response


def get_customer_zoho(customer_id):
    access_token = get_zoho_oauthtoken(os.environ.get('ZOHO_REFRESH_TOKEN'))
    headers = {
        'X-com-zoho-subscriptions-organizationid': os.environ.get('ORGANIZATION_ID') or '761647033',
        'Authorization': 'Zoho-oauthtoken {token}'.format(
            token=access_token),
        'Content-Type': 'application/json'}
    get_customer_url = "https://subscriptions.zoho.com/api/v1/customers/{customer_id}".format(customer_id=customer_id)
    print(get_customer_url)
    print(headers)
    response = requests.request("GET", get_customer_url, headers=headers)
    print(response.json())
    return response.json()


def update_customer_on_zoho(customer_id, data):
    access_token = get_zoho_oauthtoken(os.environ.get('ZOHO_REFRESH_TOKEN'))
    if data.get('company'):
        data.update({'company_name': data.get('company')})
    payload = json.dumps(data)
    headers = {
        'X-com-zoho-subscriptions-organizationid': os.environ.get('ORGANIZATION_ID') or '761647033',
        'Authorization': 'Zoho-oauthtoken {token}'.format(
            token=access_token),
        'Content-Type': 'application/json'}
    print(headers)
    print(payload)
    response = requests.request("PUT", customer_url + "/" + customer_id, data=payload, headers=headers)
    print(response)
    return response.json()



def _parse_time_components(tstr):
    # supported format is HH[:MM[:SS[.fff[fff]]]]
    if len(tstr) < 2:
        raise ValueError("Invalid Isotime format")
    hh = tstr[:2]
    mm_ss = re.findall(r":(\d{2})", tstr)
    ff = re.findall(r"\.(\d+)", tstr)
    if ff and not len(ff[0]) in [3, 6]:
        raise ValueError("Invalid Isotime format")
    ff = ff[0] if ff else []

    # ensure tstr was valid
    if len(mm_ss) < 2 and ff:
        raise ValueError("Invalid Isotime format")
    parsed_str = hh + (":" + ":".join(mm_ss) if mm_ss else "") + \
                 ("." + ff if ff else "")
    if parsed_str != tstr:
        raise ValueError("Invalid Isotime format")
    components = [int(hh)]
    if mm_ss:
        components.extend(int(t) for t in mm_ss)
    if ff:
        components.append(int(ff.ljust(6, "0")))
    return components + [0] * (4 - len(components))


def _parse_isoformat(dtstr):
    # supported format is YYYY-mm-dd[THH[:MM[:SS[.fff[fff]]]]][+HH:MM[:SS[.ffffff]]]
    dstr = dtstr[:10]
    tstr = dtstr[11:]
    try:
        date = datetime.datetime.strptime(dstr, "%Y-%m-%d")
    except ValueError as e:
        raise ValueError("Invalid Isotime format") from e

    if tstr:
        # check for time zone
        tz_pos = (tstr.find("-") + 1 or tstr.find("+") + 1)
        if tz_pos > 0:
            tzsign = -1 if tstr[tz_pos - 1] == "-" else 1
            tz_comps = _parse_time_components(tstr[tz_pos:])
            tz = tzsign * datetime.timedelta(
                hours=tz_comps[0], minutes=tz_comps[1],
                seconds=tz_comps[2], microseconds=tz_comps[3])
            tstr = tstr[:tz_pos - 1]
        else:
            tz = datetime.timedelta(0)
        time_comps = _parse_time_components(tstr)
        date = date.replace(hour=time_comps[0], minute=time_comps[1],
                            second=time_comps[2], microsecond=time_comps[3])
        date -= tz
    elif len(dtstr) == 11:
        raise ValueError("Invalid Isotime format")
    return date


def _get_expires_at(expires_in):
    expires_at = datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
    # account for clock skew
    expires_at -= datetime.timedelta(seconds=120)
    return expires_at.isoformat()


def _is_expired(expires_at):
    # Refresh in case there's no expires_at present
    if expires_at is None:
        return True
    if not isinstance(expires_at, datetime.datetime):
        # datetime.fromisoformat is 3.7+
        if sys.version_info[1] <= 6:
            expires_at = _parse_isoformat(expires_at)
        else:
            expires_at = datetime.datetime.fromisoformat(expires_at)
    if datetime.datetime.utcnow() >= expires_at:
        return True
    else:
        return False
