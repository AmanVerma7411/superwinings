import React from "react";
export default function PrivacyPolicy() {
  return (
    <section className="bg-black text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy And Policy</h1>
        <p className="mb-6 text-gray-300 text-sm leading-relaxed">
          These terms and conditions outline the rules and regulations for the use of [website_name].com.
          By accessing this website we assume you accept these terms and conditions in full. Do not continue
          to use [website_name].com if you do not accept all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Cookies</h2>
        <p className="mb-6 text-gray-300 text-sm leading-relaxed">
          We employ the use of cookies. By using [website_name].com you consent to the use of cookies in
          accordance with [website_name]’s privacy policy. Most of the modern day interactive websites use
          cookies to enable us to retrieve user details for each visit.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">License</h2>
        <p className="mb-6 text-gray-300 text-sm leading-relaxed">
          Unless otherwise stated, [website_name] and/or its licensors own the intellectual property rights
          for all material on [website_name]. All intellectual property rights are reserved.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">You must not:</h2>
        <ul className="list-disc list-inside mb-6 text-gray-300 text-sm leading-relaxed space-y-2">
          <li>Republish material from https://[website_name].com</li>
          <li>Sell, rent or sub-license material from https://[website_name].com</li>
          <li>Reproduce, duplicate or copy material from https://[website_name].com</li>
          <li>Redistribute content (unless content is specifically made for redistribution).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">
          Hyperlinking to our Content
        </h2>
        <p className="mb-4 text-gray-300 text-sm leading-relaxed">
          The following organizations may link to our Web site without prior written approval:
        </p>
        <ul className="list-disc list-inside mb-6 text-gray-300 text-sm leading-relaxed space-y-2">
          <li>Government agencies</li>
          <li>Search engines</li>
          <li>News organizations</li>
          <li>
            Online directory distributors when they list us in the directory may link to our Web site in the same
            manner as they hyperlink to other listed businesses
          </li>
          <li>
            System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls,
            and charity fundraising groups which may not hyperlink to our Web site
          </li>
        </ul>
      </div>
    </section>
  );
}
