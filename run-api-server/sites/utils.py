import logging
from pprint import pprint

import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)


class AcmCertificate:
    """
    Encapsulates ACM functions.
    """

    def __init__(self, acm_client):
        """
        :param acm_client: A Boto3 ACM client.
        """
        self.acm_client = acm_client

    def describe(self, certificate_arn):
        """
        Gets certificate metadata.

        :param certificate_arn: The Amazon Resource Name (ARN) of the certificate.
        :return: Metadata about the certificate.
        """
        try:
            response = self.acm_client.describe_certificate(
                CertificateArn=certificate_arn)
            certificate = response['Certificate']
            logger.info(
                "Got metadata for certificate for domain %s.",
                certificate['DomainName'])
        except ClientError:
            logger.exception("Couldn't get data for certificate %s.", certificate_arn)
            raise
        else:
            return certificate

    def get(self, certificate_arn):
        """
        Gets the body and certificate chain of a certificate.

        :param certificate_arn: The ARN of the certificate.
        :return: The body and chain of a certificate.
        """
        try:
            response = self.acm_client.get_certificate(CertificateArn=certificate_arn)
            logger.info("Got certificate %s and its chain.", certificate_arn)
        except ClientError:
            logger.exception("Couldn't get certificate %s.", certificate_arn)
            raise
        else:
            return response

    def import_certificate(self, certificate_body, private_key, certificate_chain):
        """
        Imports a self-signed certificate to ACM.

        :param certificate_body: The body of the certificate, in PEM format.
        :param private_key: The unencrypted private key of the certificate, in PEM
                            format.
        :return: The ARN of the imported certificate.
        """
        try:
            print(type(certificate_body), type(private_key), type(certificate_chain))
            print(certificate_body, private_key, certificate_chain)
            response = self.acm_client.import_certificate(
                Certificate=certificate_body,
                PrivateKey=private_key,
                CertificateChain=certificate_chain,
            )
            certificate_arn = response['CertificateArn']
            logger.info("Imported certificate.")
        except ClientError:
            logger.exception("Couldn't import certificate.")
            raise
        else:
            return certificate_arn

    def delete_certificate(self, certificate_arn):
        try:
            print(certificate_arn, 'certificate_arn')
            response = self.acm_client.delete_certificate(
                CertificateArn=certificate_arn
            )
            print(response, "response")
        except ClientError:
            logger.exception("Couldn't delete certificate.")
            raise
        else:
            return response

    def request_certificate(self, domain_name):
        try:
            print(domain_name, 'domain_name')
            response = self.acm_client.request_certificate(DomainName=domain_name, ValidationMethod='DNS')
            print(response, "response")
        except ClientError:
            logger.exception("Couldn't delete certificate.")
            raise
        else:
            return response


class LoadBalancer:
    def __init__(self, ec2_client):
        """
        :param ec2_client: A Boto3 ACM client.
        """
        self.ec2_client = ec2_client

    def get_all_listeners(self):
        try:
            response = self.ec2_client.describe_load_balancers()
            print(response, 'response')
        except ClientError:
            print("Couldn't get load balancers.")
            raise
        else:
            return response

    def describe_listeners(self,  load_balancer_arn):
        try:
            response = self.ec2_client.describe_load_balancers(LoadBalancerArns=[load_balancer_arn])
            print(response, 'response')
        except ClientError:
            print("Couldn't get load balancers.")
            raise
        else:
            return response

    def add_listener_certificates(self, listener_arn, certificate_arn):
        try:
            response = self.ec2_client.add_listener_certificates(
                ListenerArn=listener_arn,
                Certificates=[
                    {
                        'CertificateArn': certificate_arn,
                    },
                ]
            )
            print(response, "add_listener_certificates response")
            return True
        except Exception as e:
            print(e, "error from add_listener_certificates")
            return False

    def lb_delete_certificate(self, listener_arn, certificate_arn):
        try:
            print(certificate_arn, 'certificate_arn')
            response = self.ec2_client.remove_listener_certificates(
                ListenerArn=listener_arn,
                Certificates=[{'CertificateArn': certificate_arn}]
            )
            print(response, "response")
        except ClientError:
            logger.exception("Couldn't delete certificate.")
            raise
        else:
            return response


class Accelerators:
    def __init__(self, global_accelerator):
        """
        :param ec2_client: A Boto3 ACM client.
        """
        self.global_accelerator = global_accelerator

    def get_all_listeners(self):
        try:
            # response = self.global_accelerator.describe_listener(
            #     ListenerArn='arn:aws:globalaccelerator::403796006866:accelerator/4a3b0af6-6cce-4866-8f5d-13b504872e7d')
            response = self.global_accelerator.list_accelerators()
            print(response, 'response')
        except Exception as e:
            print(e, "Couldn't get load balancers.")
            print("Couldn't get load balancers.")
            raise
        else:
            return response



