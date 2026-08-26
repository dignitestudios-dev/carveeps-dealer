import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          CARVEEPS PRIVACY POLICY
        </h1>
        <p className="text-sm font-medium text-gray-600">
          <span className="font-semibold text-gray-800">Effective Date:</span> September 01, 2024
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <p>
          Carveeps, Inc, a California corporation (&ldquo;Carveeps&rdquo;) respects the
          privacy of its customers, business partners, employees, job applicants,
          and App visitors (&ldquo;You&rdquo; and &ldquo;your&rdquo;). Protecting your
          private information is our priority. In providing our services, we may
          collect information that identifies, relates to, describes, is
          reasonably capable of being associated with, or could reasonably be
          linked, directly or indirectly, to you (&ldquo;Personal Information&rdquo;).
        </p>
        <p>
          This Privacy Policy (the &ldquo;Policy&rdquo;) describes how we treat data and
          your Personal Information that Carveeps collects and receives through
          this mobile application (the &ldquo;App&rdquo;), and other aspects of
          Carveeps&rsquo;s business, whether online or offline.
        </p>
        <p>
          This Policy does not apply to the practices of companies that Carveeps
          neither owns nor controls.
        </p>
        <p>
          By using and accessing the App, you agree to the terms and conditions
          of this Policy. This Policy may change from time to time, and your
          continued use of the App after we make changes is deemed to be
          acceptance of those changes. Please check the Policy periodically for
          updates. If you have any questions or concerns about our use of your
          Personal Information, please contact us using the contact details
          provided at the bottom of this Policy.
        </p>
      </div>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          1. Personal Information Collection
        </h2>
        <div className="space-y-4 mb-6">
          <p>
            We may collect Personal Information from you. By providing us with
            your personal information (including your sensitive information), you
            consent to the collection, use, disclosure, and storage of that
            personal information as set out in this Privacy Policy. The types of
            Personal Information we collect will depend on how much you engage
            with our App and its services.
          </p>
          <p>
            To provide services offered by Carveeps, we must process information
            about you, including Personal Information, whether or not you are
            registered or logged in. However, we do not use your data for
            automated decision making.
          </p>
          <p>
            Here is a summary of categories of Personal Information we may have
            collected from you over the past 12 months, depending on how you use
            our services (see Section 2), as well as how we use it (see Section
            3) and with whom we may have shared it (see Section 4).
          </p>
          <p className="text-sm text-gray-600 italic">
            This Section does not apply to California-based job applicants,
            employees, contractors, or similar individuals. For California-based
            job applicants, contractors, or similar individuals, please see
            Section 7 for the Personal Information collected. Employees will be
            provided with a separate Notice at Collection.
          </p>
        </div>

        <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-900 w-1/4">
                  Category
                </th>
                <th className="px-4 py-3 font-semibold text-gray-900 w-2/3">
                  Examples
                </th>
                <th className="px-4 py-3 font-semibold text-gray-900 text-center w-1/12">
                  Collected
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Identifiers
                </td>
                <td className="px-4 py-3 text-gray-700">
                  Name, postal address, unique personal identifier, online
                  identifier, Internet Protocol (&ldquo;IP&rdquo;) address,
                  email address, Social Security number, or other similar
                  identifiers. <br />
                  <span className="text-xs text-gray-500">
                    Note: Personal Information does not include publicly
                    available information from government records.
                  </span>
                </td>
                <td className="px-4 py-3 text-center font-semibold text-green-600">
                  Yes
                </td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Personal Information
                </td>
                <td className="px-4 py-3 text-gray-700">
                  Referenced in the California Customer Records statute (Cal.
                  Civ. Code § 1798.80(e)). A name, signature, address, telephone
                  number, passport number, driver&rsquo;s license or state
                  identification card number, insurance policy number,
                  employment history. <br />
                  <span className="text-xs text-gray-500">
                    Notes: Some Personal Information included in this category
                    may overlap with other categories. Personal Information does
                    not include publicly available information from government
                    records.
                  </span>
                </td>
                <td className="px-4 py-3 text-center font-semibold text-green-600">
                  Yes
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Protected classification characteristics
                </td>
                <td className="px-4 py-3 text-gray-700">
                  Under California or federal law. Age (40 years or older), race,
                  color, ancestry, national origin, citizenship, religion or
                  creed, marital status, medical condition, physical or mental
                  disability, sex (including gender, gender identity, gender
                  expression, pregnancy or childbirth and related medical
                  conditions), sexual orientation, veteran or military status,
                  genetic information (including familial genetic information).
                </td>
                <td className="px-4 py-3 text-center font-semibold text-gray-500">
                  No
                </td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Commercial information
                </td>
                <td className="px-4 py-3 text-gray-700">
                  Records of personal property, products or services purchased,
                  obtained, or considered, or other purchasing or consuming
                  histories or tendencies.
                </td>
                <td className="px-4 py-3 text-center font-semibold text-green-600">
                  Yes
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Biometric information
                </td>
                <td className="px-4 py-3 text-gray-700">
                  Physiological, biological, or behavioral characteristics
                  (including DNA) that can be used to establish individual
                  identity, such as fingerprints and eyes, or behavioral
                  characteristics.
                </td>
                <td className="px-4 py-3 text-center font-semibold text-gray-500">
                  No
                </td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Internet or other electronic network activity
                </td>
                <td className="px-4 py-3 text-gray-700">
                  Browsing history, search history, information on a
                  consumer&rsquo;s interaction with an internet website,
                  application, or advertisement.
                </td>
                <td className="px-4 py-3 text-center font-semibold text-green-600">
                  Yes
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Geolocation data
                </td>
                <td className="px-4 py-3 text-gray-700">
                  Physical location or movements.
                </td>
                <td className="px-4 py-3 text-center font-semibold text-green-600">
                  Yes
                </td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Sensory data
                </td>
                <td className="px-4 py-3 text-gray-700">
                  Audio, electronic, visual, thermal, olfactory, or similar
                  information.
                </td>
                <td className="px-4 py-3 text-center font-semibold text-green-600">
                  Yes
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Professional or employment
                </td>
                <td className="px-4 py-3 text-gray-700">
                  Current or past job history.
                </td>
                <td className="px-4 py-3 text-center font-semibold text-gray-500">
                  No
                </td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Non-public education information
                </td>
                <td className="px-4 py-3 text-gray-700">
                  (per the Family Educational Rights and Privacy Act (20 U.S.C.
                  Sec. 1232g, 34 C.F.R. Part 99)). Education records directly
                  related to a student maintained by an educational institution or
                  party acting on its behalf, such as grades, transcripts, class
                  lists, student schedules, student identification codes,
                  student financial information, or student disciplinary records.
                </td>
                <td className="px-4 py-3 text-center font-semibold text-gray-500">
                  No
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Inferences drawn from other Personal Information
                </td>
                <td className="px-4 py-3 text-gray-700">
                  To create a profile about a consumer. Profile reflecting a
                  consumer&rsquo;s preferences, characteristics, behavior,
                  attitudes, intelligence, abilities, and aptitudes.
                </td>
                <td className="px-4 py-3 text-center font-semibold text-green-600">
                  Yes
                </td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Sensitive Personal Information
                </td>
                <td className="px-4 py-3 text-gray-700">
                  Any personal information that reveals financial account,
                  debit card, or credit card number in combination with any
                  required security or access code, precise geolocation, etc.
                </td>
                <td className="px-4 py-3 text-center font-semibold text-green-600">
                  Yes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          2. How is This Information Collected?
        </h2>
        <div className="space-y-4 mb-4">
          <p>We collect Personal Information, including without limitation:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Identifiers, Personal Information referenced in the California
              Customer Records statute, Commercial information, Sensitive
              Personal Information and Sensory data (i.e., voicemail) directly
              from you when you provide it to us.
            </li>
            <li>
              Identifiers, Personal Information referenced in the California
              Customer Records statute, Commercial Information, and Sensitive
              Personal Information, indirectly through one of our third parties
              who either store the details you provided to process billings
              information or send email campaigns.
            </li>
            <li>
              Identifiers, Personal Information referenced in the California
              Customer Records statute, Commercial Information and Sensory data
              (i.e., voicemail), information we receive from you when you
              contact our main office for any inquiries.
            </li>
            <li>
              Identifiers and Personal Information referenced in the California
              Customer Records statute, information that you provide by filling
              in forms on our App. We may also ask you for information when you
              enter a contest, fundraiser, or promotion sponsored by us, and when
              you report a problem with our App.
            </li>
            <li>
              Identifiers and Personal Information referenced in the California
              Customer Records statute that you provide in responses to surveys
              that we might ask you to complete for research purposes.
            </li>
            <li>
              Internet or other electronic network activity and Geolocation
              data, information through cookies and similar technologies.
            </li>
          </ul>
          <p>
            We may automatically collect Personal Information as you navigate
            through the App. Information collected automatically by us or
            companies acting on our behalf may include, but is not limited to,
            log and usage data, IP addresses, cookies, pixel tags, web beacons,
            device data, location data, and other tracking technologies.
          </p>
          <p>
            You may stop or restrict the placement of technologies on your
            device or remove them by adjusting your preferences as your browser
            or device permits.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Log and Usage Data
            </h3>
            <p className="text-gray-700">
              Log and usage data is service-related, diagnostic usage and
              performance information our servers automatically collect when you
              access or use our App. This log data may include your IP address,
              device information, browser type and settings, and information
              about your activity in the App (such as the date/time stamps
              associated with your usage, pages and files viewed, searches, and
              other actions you take).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookies</h3>
            <p className="text-gray-700 mb-3">
              Cookies are small text files placed in visitors&rsquo; device
              browsers to store their preferences. Most browsers allow you to
              block and delete cookies. However, if you do so, the services may
              not work properly. These cookies and other related technology allow
              third-party companies to help us improve your experience on the
              App, understand how the App is being used, and measure the number
              of visitors to the App.
            </p>
            <p className="text-gray-700 mb-2">
              Examples of such information we automatically collect include IP
              Address, a unique user ID, device and browser types and
              identifiers, referring and exit page addresses, software and
              system type, and information about your usage of the App. Examples
              of how Carveeps uses automatically collected information include
              to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
              <li>
                (a) Remember your information so that you will not have to
                re-enter it during your visit or the next time you access the
                App;
              </li>
              <li>
                (b) Provide customized advertisements, content, and
                information;
              </li>
              <li>(c) Monitor the effectiveness of marketing campaigns;</li>
              <li>
                (d) Monitor and store aggregate site usage metrics such as
                total number of visitors and pages accessed;
              </li>
              <li>
                (e) Track your entries, submissions, and status in any
                promotions or other activities.
              </li>
            </ul>
            <p className="text-gray-700">
              Your web browser may tell you how to be notified when you receive
              certain types of cookies and how to restrict, reject, or disable
              certain cookies. For more information about removing cookies for
              your specific web browser, visit{" "}
              <a
                href="https://www.allaboutcookies.org/manage-cookies/clear-cookies-installed.html"
                target="_blank"
                rel="noreferrer"
                className="text-[#ff204e] hover:underline font-medium"
              >
                allaboutcookies.org/manage-cookies/clear-cookies-installed.html
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Additional Information Collection
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-800">
                  Pixel Tags / Web Beacons
                </h4>
                <p className="text-gray-700">
                  A pixel tag (also known as a web beacon) is a piece of code
                  embedded on the App that collects information about
                  users&rsquo; engagement on that web page. The use of a pixel
                  allows us to record, for example, that a user has visited a
                  particular web page or clicked on a particular advertisement.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">Device Data</h4>
                <p className="text-gray-700">
                  We, or a third party acting on our behalf, may collect device
                  data such as information about your computer, phone, tablet,
                  or other device you use to access the App. Depending on the
                  device used, this device data may include information such as
                  your IP address (or proxy server), device application
                  identification numbers, location, browser type, hardware
                  model, Internet service provider and/or mobile carrier, and
                  operating system configuration information.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">
                  Information Collected from Other Sources
                </h4>
                <p className="text-gray-700">
                  To enhance our ability to provide relevant marketing, offers,
                  and services to you and update our records, we may obtain
                  information about you from other sources, such as public
                  databases, analytics providers, data providers, social media
                  platforms, service providers, and other third parties. If you
                  interact with us on a social media platform using your social
                  media account (e.g., Facebook, Instagram, X, or LinkedIn), we
                  receive Personal Information about you such as your name,
                  email address, and gender. Any Personal Information that we
                  collect from your social media account depends on your social
                  media account&rsquo;s privacy settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          3. Use of Personal Information
        </h2>
        <p className="mb-4 text-gray-700">
          We may use any of the Personal Information we collect for the
          following business-related purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>To enable user-to-user communications.</strong> We may use
            your Personal Information, including without limitation, name,
            email address, telephone number, or mailing address, to enable
            user-to-user communications with each user&rsquo;s consent.
          </li>
          <li>
            <strong>To respond to user inquiries/offer support to users.</strong>{" "}
            We may use your Personal Information, including without limitation,
            name, email address, telephone number, voicemail, or mailing
            address, to respond to your inquiries and solve any potential issues
            you might have with the use of our services.
          </li>
          <li>
            <strong>
              To create, manage, maintain, customize, and secure your account
              with us.
            </strong>{" "}
            We may use your Personal Information, including without limitation,
            name, email address, telephone number, mailing address, or
            commercial information for the purposes of creating, managing,
            customizing, and securing your account.
          </li>
          <li>
            <strong>
              To resolve bugs, troubleshoot problems, security incidents, and
              improve App operation.
            </strong>{" "}
            We may use your Personal Information, including without limitation,
            Internet or other electronic network activity and geolocation data,
            as part of our efforts to keep the App safe and secure (including to
            protect against malicious, deceptive, fraudulent, or illegal
            activity, and prosecute those responsible for that activity).
          </li>
          <li>
            <strong>To improve, upgrade, or enhance the App and services.</strong>{" "}
            We may use your Personal Information, including without limitation,
            your IP address and geolocation data, to improve our App and its
            functionality.
          </li>
          <li>
            <strong>To send administrative information to you.</strong> We may
            use your Personal Information, including without limitation, your
            email address and name, to send you services, updates, new feature
            information, and/or information about changes to our terms,
            conditions, and policies.
          </li>
          <li>
            <strong>To send you marketing and promotional communications.</strong>{" "}
            We may use your Personal Information, including without limitation,
            your email address, name, commercial information, and inferences, to
            deliver targeted advertising, coupons, newsletters, and other
            information regarding promotions, the App, and properties we
            manage to you.
          </li>
          <li>
            <strong>
              To compile anonymous statistical data and analysis for use
              internally or with third parties.
            </strong>{" "}
            We may use your Personal Information, including without limitation,
            your IP address and geolocation data, to monitor and analyze
            usage and trends to improve your experience with the App.
          </li>
          <li>
            <strong>To request feedback.</strong> We may use your Personal
            Information, including without limitation your name, email
            address, and commercial information, to request feedback and to
            contact you about your use of the App.
          </li>
          <li>
            <strong>To operate the App and provide our services</strong> in
            accordance with our agreements you may have with us.
          </li>
          <li>
            <strong>To carry out other purposes</strong> that are disclosed to
            you and/or to which you consent.
          </li>
          <li>
            <strong>To pursue our legitimate interests</strong> where your
            rights and freedoms do not outweigh these interests.
          </li>
          <li>
            <strong>To respond to legal requests and prevent harm.</strong> If
            we receive a subpoena or other legal request, we may need to inspect
            the data we hold in order to determine how to respond.
          </li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          4. Personal Information Sharing
        </h2>
        <div className="space-y-4 mb-4">
          <p>
            <strong>No &ldquo;Selling&rdquo; or &ldquo;Sharing&rdquo; of Personal Information:</strong>{" "}
            Carveeps does not sell your Personal Information or share your
            Personal Information for the purpose of behavioral advertising, and
            we do not allow any Personal Information to be used by third parties
            for their own marketing purposes. We do not exchange your Personal
            Information with others for monetary or other valuable
            consideration. We may process or share your Personal Information
            that we hold based on the following legal basis:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              <strong>Consent:</strong> We may process your data if you have
              given us specific consent or authorization to use your Personal
              Information for a specific purpose.
            </li>
            <li>
              <strong>Performance of a Contract:</strong> Where we have entered
              into a contract with you, we may process your Personal Information
              to fulfill the terms of our contract.
            </li>
          </ul>
        </div>

        <div className="space-y-4 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Vendors, Consultants, and Other Third-Party Service Providers
            </h3>
            <p className="text-gray-700">
              We may share your data with billing providers, third-party vendors,
              service providers, contractors, or agents who perform services for
              us or on our behalf and require access to such information to do
              that work. Examples include: payment processing, data analysis,
              email delivery, hosting services, customer service, and marketing
              efforts. We may allow selected third parties to use tracking
              technology on the App, which will enable them to collect data on
              our behalf about how you interact with the App over time. This
              information may be used to analyze and track data, determine the
              popularity of certain content, pages or features, and better
              understand online activity. Unless described in this notice, we do
              not share, sell, rent, or trade any of your information with third
              parties for their promotional purposes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Third-Party Advertisers
            </h3>
            <p className="text-gray-700">
              We may use third-party advertising companies to serve ads when you
              visit or use the App. These companies may use information about
              your visits to the App and other apps that are contained in web
              cookies and other tracking technologies to provide advertisements
              about goods and services of interest to you.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Business Partners
            </h3>
            <p className="text-gray-700">
              We may share your Personal Information with our business partners
              to offer you certain products, services, or promotions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Legal Obligations
            </h3>
            <p className="text-gray-700">
              We may disclose your Personal Information where we are legally
              required to do so to comply with applicable law, governmental
              requests, a judicial proceeding, court order, or legal process,
              such as in response to a court order or a subpoena (including in
              response to public authorities to meet national security or law
              enforcement requirements).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Vital Interests
            </h3>
            <p className="text-gray-700">
              We may disclose your Personal Information where we believe it is
              necessary to investigate, prevent, or take action regarding
              potential violations of our policies, suspected fraud, situations
              involving potential threats to the safety of any person, illegal
              activities, or as evidence in litigation in which we are involved.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Business Transfers
            </h3>
            <p className="text-gray-700">
              We may share or transfer your Personal Information in connection
              with, or during negotiations of, any merger, sale of company
              assets, financing, or acquisition of all or a portion of our
              business to another company.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Legitimate Interests
            </h3>
            <p className="text-gray-700">
              We may process your data when it is reasonably necessary to
              achieve our legitimate business interests.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          5. Unaffiliated Third-Party Links/App
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Our App may contain links to other apps or services that Carveeps
            neither owns nor operates. Apps hosted by third-party service
            providers may appear as if you are still on the App. To tell whether
            you are on one of the Apps or viewing third-party content, please
            check the URL address in your browser’s address window.
          </p>
          <p>
            We encourage you to read the privacy statements of each and every
            third-party website and service provider before providing any
            personal information to them. We are not responsible for the privacy
            practices of third parties. If you choose to visit or use any
            third-party apps or websites, including those offered by our
            third-party service providers or other partners, please be aware that
            this Policy will not apply to information that you disclose to third
            parties.
          </p>
        </div>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          6. Opt-Out And Do-Not-Track Signals
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Do Not Track (DNT) is a web browser setting that requests that a
            website or web application disable its tracking of a user&rsquo;s
            browsing data. Various web browsers (including Internet Explorer,
            Google Chrome, Firefox, and Safari) offer a &ldquo;do not
            track&rdquo; option, which sends a signal to the website or app
            visited by the user about his or her browser DNT preference setting.
          </p>
          <p>
            We do not directly respond to &ldquo;Do Not Track&rdquo; signals and
            no common industry standard for DNT has been adopted. We do not
            permit third parties other than our analytics and other service
            providers to track the users&rsquo; activity on the App. We do not
            track your online activity on other online services over time.
          </p>
        </div>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          7. Notice at Collection For Job Applicants, Contractors, Or Similar Individuals
        </h2>
        <p className="mb-4 text-gray-700">
          Pursuant to the CCPA, this section is a Privacy Notice pertaining only
          to Personal Information Carveeps may collect about a California
          resident in the course of such person acting as a job applicant,
          contractor, or similar individuals of Carveeps. During the course of
          your application for work with us, we may collect certain information
          about you. The categories of information we may collect from you over
          the past 12 months, and the purposes for collecting them, include:
        </p>

        <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-900 w-1/3">
                  Category of Information
                </th>
                <th className="px-4 py-3 font-semibold text-gray-900 w-2/3">
                  Why We Collect It
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Identifiers
                  <p className="text-xs font-normal text-gray-600 mt-1">
                    This category includes name, alias, postal address, unique
                    personal identifier, online identifier, Internet Protocol
                    address, email address, account name, social security
                    number, driver&rsquo;s license number, passport number, or
                    other similar identifiers.
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  • Collect and process employment applications, including
                  confirming eligibility for employment, background and related
                  checks, and onboarding.
                </td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Personal Information
                  <p className="text-xs font-normal text-gray-600 mt-1">
                    This category includes contact information, name, signature,
                    social security number, passport number, driver&rsquo;s
                    license or state identification card number, insurance
                    policy number, education, employment, employment history,
                    bank account number, credit or debit card number, other
                    financial information, medical information, health insurance
                    information.
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  • Collect and process employment applications, including
                  confirming eligibility for employment, background and related
                  checks, and onboarding.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Protected Classification Information
                  <p className="text-xs font-normal text-gray-600 mt-1">
                    This category includes characteristics of protected
                    classifications under California or federal law.
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  • Comply with applicable state and federal Equal Employment
                  Opportunity laws.
                </td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Internet or Other Electronic Network Activity Information
                  <p className="text-xs font-normal text-gray-600 mt-1">
                    This category includes, without limitation, Internet or
                    other electronic network activity information such as
                    browsing history, search history, and information regarding
                    your interaction with internet web sites and applications.
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  • Facilitate the efficient and secure use of the
                  company&rsquo;s information systems, ensure compliance with
                  company policies and procedures, and investigate complaints
                  and any suspected violations of company policy.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Geolocation
                  <p className="text-xs font-normal text-gray-600 mt-1">
                    This category includes physical location or movements such
                    as GPS location data.
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  • Improve safety of employees, customers, and the public with
                  regard to use of Carveeps property and equipment. Prevent
                  unauthorized access, use, or loss of Carveeps property.
                </td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Professional or Employment-Related Information
                  <p className="text-xs font-normal text-gray-600 mt-1">
                    This category includes work history, prior employer,
                    references, qualifications, skills and experience, human
                    resources data, emergency contact information, and data
                    necessary for benefits and related administrative services.
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  • Collect and process employment applications, including
                  confirming eligibility for employment, background and related
                  checks, and onboarding.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Education Information
                  <p className="text-xs font-normal text-gray-600 mt-1">
                    This category includes education history.
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  • Process, evaluate, and communicate with an individual about
                  his or her application and assess his or her eligibility and fit
                  for the role for which the individual applied.
                </td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Inferences
                  <p className="text-xs font-normal text-gray-600 mt-1">
                    Inferences drawn from any of the Personal Information
                    listed above.
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  • Assess qualifications for certain positions to create a
                  profile reflecting his or her preferences, characteristics,
                  behavior, attitudes, intelligence, abilities, and aptitudes.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Sensitive Personal Information
                  <p className="text-xs font-normal text-gray-600 mt-1">
                    This category includes any private information that
                    divulges personal identification numbers, including social
                    security, driver&rsquo;s license, passport, or state ID
                    card numbers.
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  • Collect and process employment applications, including
                  confirming eligibility for employment, background and related
                  checks, and onboarding.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          8. Security of Personal Information
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            We use appropriate technical and organizational security measures to
            protect the security of your Personal Information both online and
            offline including the implementation of access controls, firewalls,
            network intrusion detection, and use of anti-virus software. These
            measures vary based on the nature of the information collected and
            the associated risks, on the sensitivity of the Personal Information
            we collect, process, and store, and the current state of technology.
          </p>
          <p>
            We, or a third party acting on our behalf, will store the data
            necessary for encryption, especially the public and private keys
            (the private keys are stored encrypted; it is not possible to
            decrypt any private key). However, as technology continues to develop
            over time, there is no storage or transmission of data over the
            Internet that is guaranteed to be completely secure. We therefore
            cannot guarantee providing absolute security. Although we will do
            our best to protect your Personal Information, transmission of
            Personal Information to and from the App is at your own risk. You
            should only access the App within a secure environment.
          </p>
        </div>
      </section>

      {/* Section 9 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          9. Retention of Your Personal Information
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Carveeps will retain your Personal Information, including sensitive
            Personal Information, only for as long as is necessary for the
            purposes set out in this Policy. We will retain and use your
            Personal Information to the extent necessary to comply with our legal
            obligations (for example, if we are required to retain your data to
            comply with applicable laws), resolve disputes, and enforce our
            legal agreements and policies.
          </p>
          <p>
            Carveeps will also retain Usage Data (i.e., data collected
            automatically, either generated by the use of the service or from the
            service infrastructure itself, such as the duration of a page visit)
            for internal analysis purposes. Usage Data is generally retained for
            a shorter period of time, except when this data is used to
            strengthen the security or to improve the functionality of our
            service, or we are legally obligated to retain this data for longer
            time periods.
          </p>
        </div>
      </section>

      {/* Section 10 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          10. International Data Transfers
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            The App and the Services are provided, supported, and hosted in the
            United States. If you are using the App or Services from outside the
            United States, be aware that your information may be transferred to,
            stored, and processed by us in our facilities and by those third
            parties with whom we may share your Personal Information, in the
            United States and other countries. These countries may have data
            protection laws that are different from the laws of your country.
          </p>
          <p>
            However, we have taken appropriate measures to ensure that your
            Personal Information remains protected in accordance with this
            Policy and have implemented appropriate safeguards.
          </p>
        </div>
      </section>

      {/* Section 11 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          11. Your Rights and Choices
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            You may request details of the Personal Information we hold about
            you, and we will generally provide you with these rights and choices
            subject to some exceptions permitted by law. For example, if
            providing this access may disclose information about another person,
            or may disclose commercially sensitive information, we may need to
            refuse to grant you access. Details about how to contact us are at
            the end of this document.
          </p>
          <p>
            To the extent permitted by international laws, charges may apply to
            cover the cost of accessing and providing you with this information.
            Carveeps will not charge a fee to consumers who exercise their
            rights under the California Consumer Privacy Act (CCPA) or California
            Privacy Rights Act (CPRA), unless Carveeps, at its sole discretion,
            determines that the consumer&rsquo;s requests are &ldquo;manifestly
            unfounded or excessive,&rdquo; particularly due to their repetitive
            nature.
          </p>
          <p>
            If we cannot provide you with access, we will provide a statement of
            our reasons. You are entitled to additional efforts to protect your
            privacy. These rights include:
          </p>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Right to Access/Know:</strong> You may request any or all
              of the following information relating to your Personal Information
              we have collected and disclosed in the last 12 months, upon
              verification of your identity:
              <ul className="list-circle pl-6 mt-2 space-y-1 text-sm text-gray-600">
                <li>
                  • The specific pieces of Personal Information we have
                  collected about you;
                </li>
                <li>
                  • The categories of Personal Information we have collected
                  about you;
                </li>
                <li>
                  • The categories of sources of the Personal Information;
                </li>
                <li>
                  • The categories of Personal Information that we have
                  disclosed to third parties for a business purpose, and the
                  categories of recipients to whom this information was
                  disclosed;
                </li>
                <li>
                  • The categories of Personal Information we have sold about
                  you (if any), and the categories of third parties to whom the
                  information was sold;
                </li>
                <li>
                  • The business or commercial purposes for collecting or, if
                  applicable, selling the Personal Information.
                </li>
              </ul>
            </li>
            <li>
              <strong>Right to Correct:</strong> You have the right to request
              correction of inaccurate personal information that we maintain about
              you or update the information we have on file.
            </li>
            <li>
              <strong>Right to Request Deletion:</strong> You have the right to
              request deletion of Personal Information that Carveeps has
              collected about you.
            </li>
            <li>
              <strong>Right to Opt-Out:</strong> You have the right to
              &ldquo;opt-out&rdquo; of the sale or sharing of Personal
              Information.
            </li>
            <li>
              <strong>Right to No Retaliation:</strong> A consumer (including
              employees, job applicants, or independent contractors) has a right
              not to receive discriminatory or retaliatory treatment by Carveeps
              for the valid exercise of privacy rights conferred by the
              CCPA/CPRA.
            </li>
            <li>
              <strong>Right to Limit Use:</strong> You have the right to
              request that you limit a California consumer&rsquo;s use and
              disclosure of your sensitive Personal Information.
            </li>
            <li>
              <strong>
                For Australian Residents Only - Your Right to Object:
              </strong>{" "}
              You can ask us to stop processing your personal information, and
              we will do so, if we are:
              <ul className="list-circle pl-6 mt-1 space-y-1 text-sm text-gray-600">
                <li>
                  • Relying on our own or someone else&rsquo;s legitimate
                  interests to process your personal information, except if we
                  can demonstrate compelling legal grounds for the processing;
                  or
                </li>
                <li>
                  • Processing your personal information for direct marketing
                  purposes.
                </li>
              </ul>
            </li>
          </ul>

          <p className="mt-4 font-semibold text-gray-900">
            We may deny your deletion request if retaining the information is
            reasonably necessary for the business or necessary for us or our
            service provider(s) to:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              Complete the transaction for which we collected the Personal
              Information, provide a good or service that you requested, take
              actions reasonably anticipated within the context of our ongoing
              relationship with you, or otherwise perform our contract with you.
            </li>
            <li>
              Detect security incidents, protect against malicious, deceptive,
              fraudulent, or illegal activity, or prosecute those responsible
              for such activities.
            </li>
            <li>
              Debug products to identify and repair errors that impair existing
              intended functionality.
            </li>
            <li>
              Exercise free speech, ensure the right of another consumer to
              exercise their free speech rights, or exercise another right
              provided for by law.
            </li>
            <li>
              Comply with the California Electronic Communications Privacy Act
              (Cal. Penal Code § 1546 seq.).
            </li>
            <li>
              Engage in public or peer-reviewed scientific, historical, or
              statistical research in the public interest that adheres to all
              other applicable ethics and privacy laws, when the
              information&rsquo;s deletion may likely render impossible or
              seriously impair the research&rsquo;s achievement, if you
              previously provided informed consent.
            </li>
            <li>
              Enable solely internal uses that are reasonably aligned with
              consumer expectations based on your relationship with us.
            </li>
            <li>Comply with a legal obligation.</li>
            <li>
              Make other internal and lawful uses of that information that are
              compatible with the context in which you provided it.
            </li>
          </ul>

          <p className="mt-4">
            To exercise any of your rights described above, please submit a
            request to us by either:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 my-4">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Mailing Address:</p>
              <p className="text-gray-700">Administrator</p>
              <p className="text-gray-700">Carveeps, Inc.</p>
              <p className="text-gray-700">5700 Cushing Parkway</p>
              <p className="text-gray-700">Fremont, CA 94538</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Email Address:</p>
              <a
                href="mailto:Admin@carveeps.com"
                className="text-[#ff204e] hover:underline font-medium"
              >
                Admin@carveeps.com
              </a>
            </div>
          </div>

          <p>
            You may only make a request for access or data portability twice
            within a 12-month period. The request must:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              Provide sufficient information that allows us to reasonably
              verify whether you are the person about whom we collected Personal
              Information or an authorized representative. We reserve the right
              to confirm your California residency. Government identification
              may be required.
            </li>
            <li>
              If you wish to designate an authorized agent to make a request on
              your behalf, we will need to verify both your and your
              agent&rsquo;s identities, which may require submission of
              government identification. Your agent must also provide other
              proof of authority acceptable to us in our sole discretion.
            </li>
            <li>
              Describe your request with sufficient detail that allows us to
              properly understand, evaluate, and respond to it.
            </li>
          </ul>

          <p>
            We cannot respond to your request or provide you with Personal
            Information if we cannot verify your identity or authority to make
            the request and confirm the Personal Information relates to you. In
            certain cases, we may be permitted by law to deny your request.
          </p>
          <p>
            Making a request does not require you to create an account with us.
            We will only use Personal Information provided in a request to verify
            the requestor&rsquo;s identity or authority to make the request.
          </p>
        </div>
      </section>

      {/* Section 12 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          12. Non-Discrimination
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            We will not discriminate against you for exercising any of your
            CCPA/CPRA rights. You have the right not to receive discriminatory
            treatment by Carveeps for the exercise of privacy rights conferred
            by the CCPA/CPRA, including an employee&rsquo;s, applicant&rsquo;s,
            or independent contractor&rsquo;s right not to be retaliated
            against for the exercise of their CCPA/CPRA rights. Unless permitted
            by the CCPA/CPRA, we will not:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Deny you goods or services.</li>
            <li>
              Charge you different prices or rates for goods or services,
              including through granting discounts or other benefits, or
              imposing penalties.
            </li>
            <li>
              Provide you with a different level or quality of goods or services.
            </li>
            <li>
              Suggest that you may receive a different price or rate for goods
              or services or a different level or quality of goods or services.
            </li>
          </ul>
          <p>
            We provide these tools for your benefit, and we will never
            discriminate against you for using them. But if you choose to delete
            your data or close your account, we won&rsquo;t be able to offer you
            services that require us to use your data.
          </p>
        </div>
      </section>

      {/* Section 13 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          13. Minors
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Carveeps recognizes the privacy interests of children, and we
            encourage parents and guardians to take an active role in their
            children&rsquo;s online activities and interests. Neither the App
            nor our services are directed to children under 13 (or other age as
            defined by local law). We do not target our services or the App to
            children. We also do not knowingly collect Personal Information from
            children. If we learn that we have collected any Personal
            Information from a child in violation of applicable law, we will
            immediately take steps to delete such information. If you learn that
            your child has provided us with Personal Information without your
            consent, please contact us using the contact information provided
            below.
          </p>
        </div>
      </section>

      {/* Section 14 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          14. Changes to this Privacy Policy
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            We reserve the right to change this Policy at any time. If we make
            any material changes to this Policy, we will update the
            &ldquo;Effective Date&rdquo; at the top of this page and update our
            notices on the App. You are responsible for ensuring we have an
            up-to-date active and deliverable email address for you, and for
            periodically visiting our App and this Policy to check for any
            changes.
          </p>
        </div>
      </section>

      {/* Section 15 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          15. Contact Us
        </h2>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-4">
          <div>
            <strong className="block text-gray-900 font-semibold mb-1">
              Mailing Address:
            </strong>
            <p className="text-gray-700">Administrator</p>
            <p className="text-gray-700">Carveeps, Inc.</p>
            <p className="text-gray-700">5700 Cushing Parkway</p>
            <p className="text-gray-700">Fremont, CA 94538</p>
          </div>
          <div>
            <strong className="block text-gray-900 font-semibold mb-1">
              Email Address:
            </strong>
            <a
              href="mailto:Admin@carveeps.com"
              className="text-[#ff204e] hover:underline font-medium"
            >
              Admin@carveeps.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
