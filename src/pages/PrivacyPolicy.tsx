import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <p className="lead">
              At EduVault, we take your privacy seriously. This Privacy Policy describes how we collect, use, 
              and protect your personal information when you use our platform.
            </p>
            
            <h2>1. Information We Collect</h2>
            <p>
              We collect the following types of information:
            </p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, and profile details</li>
              <li><strong>Usage Data:</strong> How you interact with our platform, resources viewed, uploads, and downloads</li>
              <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers</li>
              <li><strong>Content:</strong> Resources, documents, and files you upload to the platform</li>
            </ul>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Personalize your experience and content recommendations</li>
              <li>Improve and develop the platform based on user feedback</li>
              <li>Communicate with you about updates and new features</li>
              <li>Ensure security and prevent unauthorized access</li>
            </ul>
            
            <h2>3. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We may share information with:
            </p>
            <ul>
              <li>Service providers who help us operate the platform</li>
              <li>Other users when you choose to share content publicly</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your information from unauthorized 
              access, alteration, or disclosure. However, no internet transmission is completely secure, 
              and we cannot guarantee absolute security.
            </p>
            
            <h2>5. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Delete your information</li>
              <li>Object to certain processing activities</li>
              <li>Download your data in a portable format</li>
            </ul>
            
            <h2>6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and tailor content. 
              You can manage cookie preferences through your browser settings.
            </p>
            
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect personal 
              information from children under 13.
            </p>
            
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes 
              via email or platform notifications.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at 
              <a href="mailto:privacy@eduvault.com" className="text-primary"> privacy@eduvault.com</a>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 