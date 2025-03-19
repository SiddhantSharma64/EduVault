import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Copyright = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Copyright Policy</h1>
          
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <p className="lead">
              EduVault respects intellectual property rights and expects our users to do the same. 
              This Copyright Policy outlines our approach to copyright protection and infringement.
            </p>
            
            <h2>1. Copyright Protection</h2>
            <p>
              All content uploaded to EduVault remains the intellectual property of the original creator 
              or rightsholder. By uploading content, users grant EduVault a limited license to display 
              and make that content available according to their sharing preferences.
            </p>
            
            <h2>2. Acceptable Use</h2>
            <p>
              Users may only upload content they:
            </p>
            <ul>
              <li>Have created themselves</li>
              <li>Have explicit permission to share from the copyright holder</li>
              <li>Are legally permitted to distribute under applicable law (e.g., fair use for educational purposes)</li>
            </ul>
            
            <h2>3. Copyright Infringement</h2>
            <p>
              EduVault prohibits the unauthorized upload, sharing, or distribution of copyrighted materials. 
              Examples of prohibited activities include:
            </p>
            <ul>
              <li>Uploading textbooks, academic papers, or articles without permission</li>
              <li>Sharing proprietary course materials without authorization</li>
              <li>Distributing licensed software or digital content in violation of its terms</li>
            </ul>
            
            <h2>4. DMCA Compliance</h2>
            <p>
              EduVault complies with the Digital Millennium Copyright Act (DMCA). If you believe your 
              copyrighted work has been used on our platform without authorization, you may submit a 
              DMCA takedown notice.
            </p>
            
            <h3>DMCA Takedown Procedure</h3>
            <p>
              To submit a DMCA notice, please provide the following information to 
              <a href="mailto:copyright@eduvault.com" className="text-primary"> copyright@eduvault.com</a>:
            </p>
            <ol>
              <li>A physical or electronic signature of the copyright owner or authorized agent</li>
              <li>Identification of the copyrighted work claimed to be infringed</li>
              <li>Identification of the material that is claimed to be infringing and its location on our platform</li>
              <li>Your contact information (name, address, telephone number, email)</li>
              <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner</li>
              <li>A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on their behalf</li>
            </ol>
            
            <h2>5. Counter Notices</h2>
            <p>
              If your content was removed due to a DMCA notice and you believe this was in error, you may 
              submit a counter-notice. Please contact us for instructions on this process.
            </p>
            
            <h2>6. Repeat Infringers</h2>
            <p>
              EduVault maintains a policy of terminating accounts of users who repeatedly infringe or are 
              repeatedly charged with infringing the copyrights of others.
            </p>
            
            <h2>7. Fair Use</h2>
            <p>
              EduVault recognizes the doctrine of fair use in educational contexts. However, users should 
              be aware that fair use is a limited exception and should carefully consider whether their 
              use qualifies before uploading copyrighted materials.
            </p>
            
            <h2>8. Contact Information</h2>
            <p>
              For copyright inquiries, please contact our copyright agent at 
              <a href="mailto:copyright@eduvault.com" className="text-primary"> copyright@eduvault.com</a>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Copyright; 