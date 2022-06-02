import React from "react";
import RunLogo from "@assets/images/marketing_site/run-logo.png";
import IconAccount from "@assets/images/marketing_site/icon-account.png";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  // const history = useHistory();
  // const goHome = () => {
  //   history.push()
  // }
  return (
    <>
      <div>
        <div className="terms-nav">
          <Link to="/">
            <img src={RunLogo} className="logo" />
          </Link>

          <nav>
            <div className="tab">
              <Link to="/register">Sign up</Link>
            </div>

            <div className="tab">
              <Link to="/login">
                Log in <img src={IconAccount} />
              </Link>
            </div>
          </nav>
        </div>
        <div className="terms-body">
          <h1>Terms And Conditions</h1>
          The Run platform will be made available to authorised and subscribed
          users as per the terms and conditions of the platform.
          <dl>
            <ol>
              <dt>The Platform​</dt>
              <dd>
                <li>
                  Welcome to Run (“Company”, “we”, “our”, “us”)! These Terms of
                  Service (“Terms”, “Terms of Service”) govern your use of our
                  website located at https://dev.designedtorun.com/ (together or
                  individually “Service”) operated by Run. Our Privacy Policy
                  also governs your use of our Service and explains how we
                  collect, safeguard and disclose information that results from
                  your use of our web pages. Your agreement with us includes
                  these Terms and our Privacy Policy (“Agreements”). You
                  acknowledge that you have read and understood Agreements, and
                  agree to be bound by them. If you do not agree with (or cannot
                  comply with) Agreements, then you may not use the Service, but
                  please let us know by emailing at
                  timtim@bright-development.com so we can try to find a
                  solution. These Terms apply to all visitors, users and others
                  who wish to access or use Service.
                </li>
                <li>
                  By using our Service, you agree to subscribe to newsletters,
                  marketing or promotional materials and other information we
                  may send. However, you may opt out of receiving any, or all,
                  of these communications from us by following the unsubscribe
                  link or by emailing at timtim@bright-development.com .
                </li>
                <li>
                  By opening an account to use the Services provided by Run, you
                  expressly represent and warrant that you have accepted our
                  Terms of Use, and any additional terms and conditions
                  displayed on the Platform (including without limitation our
                  Privacy Policy and AML-CTF Policy) as they apply from time to
                  time.
                </li>
                <li>
                  We grant you a non-exclusive, revocable, non-transferable
                  licence to use the software on a server controlled by us for
                  the sole purpose of accessing and obtaining the material on
                  the Platform.
                </li>
                <li>
                  We may amend, modify, add to, or delete these Terms of Use at
                  our discretion and those amendments, modifications, additions,
                  or deletions apply to your use of the Platform and Services as
                  soon as they are displayed on the Platform (whether you are
                  aware of those amendments, modifications, additions, or
                  deletions). All subsequent transactions by you will be subject
                  to the amended and most current Terms of Use.
                </li>
                <li>
                  Your eligibility and use of our Platform and Services is
                  dependent upon your country of residence. The Services
                  provided by Run are limited to the following jurisdiction:
                  Australia.
                </li>
              </dd>
              <dt>Your Obligations</dt>
              <dd>
                <li>
                  You warrant to us that you are a bona fide user of Run’s
                  Platform and Services for the purposes of managing the NDIS
                  plans on behalf of your Participants
                </li>
                <dl>
                  <li>
                    <dt>You must not:</dt>
                    <dd>
                      <ol type="a">
                        <dl>
                          <li>
                            <dt>
                              Engage in any restricted or criminal activities,
                              including but not limited to:
                            </dt>
                            <dd>
                              <ol type="i">
                                <li>Terrorist Financing;</li>
                                <li>Money Laundering;</li>
                                <li>Malicious Hacking;</li>
                              </ol>
                            </dd>
                          </li>
                          <li>
                            Knowingly or recklessly provide us with inaccurate
                            information through the Platform
                          </li>
                          <li>
                            Use Run’s Platform and Services for the purpose of
                            obtaining, processing, distributing, viewing,
                            assessing, analysing, copying or replicating any
                            information, methods or processes related to the
                            Platform (including without limitation by way of
                            data scraping, the use of collection or accumulation
                            tools and robotic or scripted responses);
                          </li>
                          <li>
                            Reverse engineer, disassemble or otherwise attempt
                            to construct, copy or replicate the Platform’s
                            source code, formulas or processes;
                          </li>
                          <li>
                            Interfere with the security of the Platform or the
                            safe use of the Platform by others (including
                            without limitation by way of distributing viruses,
                            corrupted files or other similar software or
                            programs that may damage the operation of any
                            computer hardware or software or which are otherwise
                            directed at the Website or its users);
                          </li>
                          <li>
                            Use this Platform for any purpose that is unlawful
                            or prohibited or in a way which infringes the
                            intellectual property rights or other rights of any
                            person (including us);
                          </li>
                          <li>
                            Knowingly or recklessly use and/or take advantage of
                            a technical or technological error, loophole or
                            glitch on Run’s Platform and Services;
                          </li>
                          <li>
                            Use the Platform or the information contained in it
                            for commercial purposes which are competitive to the
                            Platform or our business or which would otherwise be
                            detrimental or prejudicial to our interests in any
                            way;
                          </li>
                          <li>
                            Use systematic, repetitive or other related methods
                            which are designed to generate or obtain repetitive
                            and repeated amounts of data or other information
                            from or to the Platformor which may otherwise place
                            an unreasonable load on the infrastructure of the
                            Platform;
                          </li>
                          <li>
                            Publish, post, distribute, disseminate or send ‘spam
                            material’ or engage in any communication that is
                            offensive, false, unlawful, defamatory, indecent,
                            unfair or inappropriate in any way to others, which
                            would reasonably be considered ‘spam’ or which is
                            deliberately false, misleading, or deceptive (or
                            likely to mislead or deceive);
                          </li>
                          <li>
                            Collect or store personal data about other users of
                            the Platform; or
                          </li>
                          <li>
                            Do anything else which may interfere with or
                            negatively affect the operation of our Platform,
                            Services or others users.
                          </li>
                        </dl>
                      </ol>
                    </dd>
                  </li>
                  <li>
                    Any user of Run’s Platform who violates or breaches our
                    Terms of Use may have their membership and account
                    terminated, as well as any pending transactions cancelled.
                    You may also be held liable for any losses incurred by Run
                    or any other user of the Platform.
                  </li>
                  <li>
                    Run encourages users to report any problems or
                    vulnerabilities with our Platform and Services by submitting
                    a support request on our website or emailing us on
                    timtim@bright-development.com. If you notify us in good
                    faith, we will not restrict your use of our Platform or
                    Services.
                  </li>
                </dl>
              </dd>
              <dt>Termination</dt>
              <dd>
                <li>
                  <dl>
                    <dt>
                      Run may suspend, limit, restrict, deactivate or terminate
                      your access to Run’s Platform and Services if:
                    </dt>
                    <dd>
                      <ol type="a">
                        <li>
                          You gain or attempt to gain unauthorised access to the
                          Platform or another Run members account;
                        </li>
                        <li>There is a technical or operational difficulty;</li>
                        <li>
                          You use the Run Platform in order to perform illegal
                          or criminal activities;
                        </li>
                        <li>
                          Your use of the Run Platform is subject to any pending
                          investigation, litigation or government proceeding;
                        </li>
                        <li>
                          You fail to pay or fraudulently pay for any
                          transactions;
                        </li>
                        <li>We are unable to support your use;</li>
                        <li>
                          You breach any terms of this Terms of Use Agreement or
                          Privacy Policy; or
                        </li>
                        <li>
                          Run receive a request from a law enforcement or
                          government agency to do so.
                        </li>
                      </ol>
                    </dd>
                  </dl>
                </li>
              </dd>
              <dt>Indemnity</dt>
              <dd>
                <dl>
                  <dt>
                    <li>
                      To the maximum extent permitted by law, you agree to
                      indemnify, defend and hold harmless Run (and each of its
                      associated entities, directors, officers, affiliates,
                      employees, service providers, members, representatives and
                      agents, collectively the “Indemnified Parties”) from and
                      against all claims, demands, actions, suits, proceedings,
                      liabilities, losses, damages, penalties, fines, expenses
                      and costs (including reasonable legal costs awarded by a
                      court) which arise out of or relate to:
                    </li>
                  </dt>
                  <dd>
                    <ol type="a">
                      <li>
                        your conduct and use of our Platform and Services;
                      </li>
                      <li>
                        your breach of these Terms of Use, Run’s Privacy Policy
                        and/or AML-CTF Policy;
                      </li>
                      <li>your breach of any law, regulation or rule;</li>
                      <li>
                        your violation or breach of Run’s copyright,
                        intellectual property, trade secrets, patents,
                        trademarks, service marks or any other proprietary right
                        under law;
                      </li>
                      <li>
                        any information that you provide to us via our Platform
                        and Services; or
                      </li>
                      <li>
                        any damage that you may cause to our Platform and
                        Services, to any Run user or any other person or entity.
                      </li>
                    </ol>
                  </dd>
                </dl>
                <li>
                  This indemnity includes without limitation, liability relating
                  to intellectual property rights, defamation, and breaches of
                  privacy.
                </li>
              </dd>
              <dt>Liability</dt>
              <dd>
                <li>
                  To the maximum extent permitted by law, Run does not guarantee
                  the quality, performance or fitness for purpose of the
                  Platform and Services or the completeness, accuracy or
                  currency of statements, representations and information of
                  others (including without limitation data, reports and
                  analyses) provided via the Platform and Services and Run will
                  not be liable to any person or entity for any direct,
                  indirect, consequential or other loss, damage, liability,
                  claim or expense (however caused, including due to negligence
                  or breach of contract) which may arise out of, or in
                  connection with, the use of the Platform and Services or the
                  use of or reliance on information contained on or linked to
                  the Platform and Services.
                </li>
              </dd>
              <dt>Use of our Platform and Services</dt>
              <dd>
                <li>
                  The transmission of information over the Internet (including
                  to or from the Platform) is not completely secure or error
                  free. In particular, emails to or from us and information
                  submitted to or accessed via this Platform may not be secure
                  and you should use discretion in deciding what information you
                  send to us via these means.
                </li>
                <li>
                  Emails to and from us may undergo email filtering and virus
                  scanning, including by third party contractors. We do not
                  warrant that such filters and scans will be effective in
                  removing viruses or other potentially harmful code.
                </li>
                <li>
                  You acknowledge that you use the Platform and Services (and
                  obtain and transmit data to it) entirely at your own risk,
                  that it is provided on an ‘as is’ basis and that we do not
                  make any representations or warranties as to the security,
                  availability of our Platform and Services or that your access
                  or use will be uninterrupted, timely or secure.
                </li>
                <li>
                  We cannot guarantee the identity of any other user, receiver
                  or other party you engage with.
                </li>
                <li>
                  You must notify Run immediately of any unauthorised access or
                  use of your account, password or any other applicable breach
                  of our Platform and Services by submitting a support request
                  on our website.
                </li>
                <li>
                  We may use cookies to identify your computer on our server and
                  so we can track your use on our Platform. In some instances,
                  cookies may collect and store personal information about you.
                  Such personal information will only be used by us in
                  accordance with our Privacy Policy.
                </li>
                <li>
                  All information, graphics, data, prices, charts, video, audio
                  and any other material (Platform Material) displayed on or
                  available on the Platform, and all the underlying source code
                  and software, is owned or used under license by us, except
                  where expressly stated in these Terms of Use or elsewhere on
                  the Platform.
                </li>
                <li>
                  This Platform, all Platform Material and any intellectual
                  property which vests in either of them is protected by
                  copyright. You may download and print content from this
                  Platform for your own personal or internal business purposes
                  only. You must not publish, adapt, communicate to the public,
                  distribute to third parties, amend or make any other copy of
                  information on this Platform without our prior written consent
                  or otherwise do anything which would infringe our intellectual
                  property rights in the Platform or the Platform Material.
                </li>
                <li>
                  All trademarks, registered trademarks, product names, logos
                  and company names mentioned on this Platform are either owned
                  by us or are displayed under licence or with permission from
                  the owner. Those third-party marks, logos and names remain the
                  property of their respective owners.
                </li>
                <li>
                  Reference on the Platform to any companies, products,
                  services, branding, offers or other information, by trade
                  name, trademark or otherwise does not constitute or imply
                  endorsement, sponsorship or recommendation by us or the
                  respective trademark owner.
                </li>
                <li>
                  Any personal information we collect about you via this
                  Platform will only be used and disclosed by us in accordance
                  with our Privacy Policy.
                </li>
              </dd>
              <dt>General</dt>
              <dd>
                <li>
                  The Terms of Use published on the date you view them on the
                  Platform supersede all prior versions.
                </li>
                <li>
                  If any provision of the Terms of Use are held to be invalid,
                  unenforceable or illegal for any reason, the remaining parts
                  of the Terms of Use will be in full force and effect.
                </li>
                <li>
                  If we are unable to perform our Services as stipulated in the
                  Terms of Use due to circumstances out of our control,
                  including but not limited to, change of law, regulations or
                  policy, or an event of Force Majeure, we will not be held
                  liable.
                </li>
                <li>
                  These Terms of Use are governed by the laws of the State of
                  New South Wales and in the event that we have a legal dispute
                  relating to this Platform or these Website Terms and
                  Conditions, the Courts of New South Wales will have
                  non-exclusive jurisdiction.
                </li>
              </dd>
              <dt>Availability</dt>
              <dd>
                <li>
                  The Run platform will be available for you to use 24 hours a
                  day unless updates or patches are applied on the platform. In
                  this case prior notifications will be sent out and system will
                  be upgraded during the time that’s the least busy to avoid any
                  service obstructions to you and your participants.
                </li>
              </dd>
              <dt>Complaints and Enquiries</dt>
              <dd>
                <dl>
                  <dt>
                    <li>
                      If you have any queries or complaints about this Privacy
                      Statement, please lodge them to us using the email and
                      phone options below:
                    </li>
                  </dt>
                  <dd>
                    <ol type="a">
                      <li>By email info@Run.com</li>
                      <li>By phone on +61 424 472 697</li>
                    </ol>
                  </dd>
                </dl>
                <li>
                  Any complaints will be responded to within seven days. If you
                  are not satisfied with the outcome you are entitled to contact
                  the office of the privacy commissioner.
                </li>
              </dd>
            </ol>
          </dl>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
