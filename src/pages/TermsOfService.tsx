import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using EduVault's services, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our platform.
            </p>
            
            <h2>2. User Responsibilities</h2>
            <p>
              When using EduVault, you agree to:
            </p>
            <ul>
              <li>Provide accurate information when registering</li>
              <li>Maintain the confidentiality of your account information</li>
              <li>Only upload content you have the legal right to share</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Not engage in any illegal or unauthorized activities</li>
            </ul>
            
            <h2>3. Content Sharing</h2>
            <p>
              Users may share academic resources for educational purposes. By uploading content, you grant
              EduVault a non-exclusive license to display and make your content available to other users
              according to your sharing preferences.
            </p>
            
            <h2>4. Intellectual Property</h2>
            <p>
              All content shared on EduVault remains the property of its original creator. Users may not
              download, copy, or distribute content for commercial purposes without explicit permission.
            </p>
            
            <h2>5. Privacy</h2>
            <p>
              Your privacy is important to us. Please refer to our 
              <a href="/privacy" className="text-primary"> Privacy Policy </a> 
              for details on how we collect, use, and protect your data.
            </p>
            
            <h2>6. Termination</h2>
            <p>
              EduVault reserves the right to terminate or suspend accounts that violate these terms or
              engage in inappropriate behavior on the platform.
            </p>
            
            <h2>7. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of EduVault after changes
              constitutes acceptance of the new terms.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at 
              <a href="mailto:support@eduvault.com" className="text-primary"> support@eduvault.com</a>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService; 