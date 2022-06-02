import { matchPath } from "react-router";

const mailchimpUrl = "mailchimp";
const actionNetworkUrl = "action-network";
const googleFormUrl = "google-sheet";
const submitToNPGVanUrl = "ngp-van";

const actionNetworkPredefinedFields = {
  core_first_name: "core_first_name",
  core_last_name: "core_last_name",
  core_email: "core_email",
  core_street: "core_street",
  core_city: "core_city",
  core_zip_code: "core_zip_code",
  core_country: "core_country",
  core_phone: "core_phone",
  core_sms_checkbox: "core_sms_checkbox",
};

const mailchimpPredefinedFields = { EMAIL: "email_address" };

export function submitForm(form, blockData) {
  if (blockData.fields.length === 0) {
    throw new Error("Please add fields first");
  }
  if (!blockData.formProvider) {
    throw new Error("Please select form provider");
  }
  try {
    switch (blockData.formProvider) {
      case "mailchimp":
        return submitToMailchimp(form, blockData);
      case "action_network":
        return submitToActionNetwork(form, blockData);
      case "google_forms":
        return submitToGoogleForms(form, blockData);
      case "ngpvan":
        return submitToNPGVan(form, blockData);
    }
  } catch (err) {
    console.warn(err);
    const errorMsg =
      blockData.formProvider === "google_forms"
        ? "Form submit failed, make sure google sheet URL is correct. Contact admin if issue persists."
        : "Form submit failed. Contact admin if issue persists.";
    throw new Error(errorMsg);
  }
}

function mapFields(body, customFieldKey, predefiendFields, fields, form) {
  body[customFieldKey] = {};
  fields.forEach((field) => {
    if (field.type === "heading") return;
    if (predefiendFields[field.name]) {
      body[predefiendFields[field.name]] = form[field.name].value;
      return;
    }
    if (field.type === "checkbox") {
      let value = "";
      [...form[field.name]].forEach((checkbox) => {
        if (checkbox.checked) {
          if (value.length) {
            value += ", ";
          }
          value += checkbox.value;
        }
      });
      body[customFieldKey][field.name] = value;
      return;
    }

    body[customFieldKey][field.name] = form[field.name].value;
  });
}

function submitToMailchimp(form, blockData) {
  const body = {
    formId: blockData.formId,

    data: {
      server_prefix: "us5",
      mailchimpApiKey: blockData.formApiKey,
      merge_fields: {},
    },
  };

  mapFields(
    body.data,
    "merge_fields",
    mailchimpPredefinedFields,
    blockData.fields,
    form
  );

  return submitRequest(mailchimpUrl, body);
}

function submitToNPGVan(form, blockData) {
  const body = {
    apiKey: `${blockData.ngpvanEmail}/${blockData.formApiKey}|1`,
    data: {},
  };
  const addressFields = [
    "addressLine1",
    "addressLine2",
    "addressLine3",
    "city",
    "stateOrProvince",
    "zipOrPostalCode",
    "countryCode",
    "dateOfBirth",
  ];
  const fieldsRequiredMap = ["email", "phoneNumber", ...addressFields];
  const filteredFields = blockData.fields.filter(
    (f) => !fieldsRequiredMap.includes(f.name)
  );
  mapFields(body, "data", {}, filteredFields, form);
  if (form["email"]?.value) {
    body.data.emails = [{ email: form["email"].value }];
  }
  if (form["phoneNumber"]?.value) {
    body.data.phones = [{ phoneNumber: form["phoneNumber"].value }];
  }
  if (addressFields.some((af) => form[af]?.value)) {
    body.data.addresses = [
      {
        addressLine1: form["addressLine1"]?.value || "",
        addressLine2: form["addressLine2"]?.value || "",
        addressLine3: form["addressLine3"]?.value || "",
        city: form["city"]?.value || "",
        stateOrProvince: form["stateOrProvince"]?.value || "",
        zipOrPostalCode: form["zipOrPostalCode"]?.value || "",
        countryCode: form["countryCode"]?.value || "",
      },
    ];
  }
  if (form["dateOfBirth"]?.value) {
    body.data["dateOfBirth"] = new Date(
      form["dateOfBirth"].value
    ).toISOString();
  }

  return submitRequest(submitToNPGVanUrl, body);
}

function submitToActionNetwork(form, blockData) {
  const body = {
    apiKey: blockData.formApiKey,
    formId: blockData.formId,

    data: {
      person: {},
    },
  };

  mapFields(
    body.data.person,
    "custom_fields",
    actionNetworkPredefinedFields,
    blockData.fields,
    form
  );

  return submitRequest(actionNetworkUrl, body);
}

function submitToGoogleForms(form, blockData) {
  const urlMatch = matchPath(blockData.formId, {
    path: "https://docs.google.com/spreadsheets/d/:spreadsheetId/",
    exact: false,
    strict: false,
  });

  const body = {
    googleSheetID: urlMatch.params["spreadsheetId"],
    // sheetId: blockData.formId,
    data: {},
  };

  mapFields(body, "data", {}, blockData.fields, form);
  return submitRequest(googleFormUrl, body);
}

function submitRequest(url, body) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
    mode: "no-cors",
  };

  return fetch(process.env.REACT_APP_FORM_API_BASE_URL + url, requestOptions);
}
