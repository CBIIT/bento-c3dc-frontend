import React from 'react';

const ContactUsSection = ({ classes }) => (
  <div>
    <div id='Contact Us' className={classes.sectionTitle}>
      <p>Contact Information</p>
    </div>
    <div className={classes.contentContainer}>
      <p style={{ paddingBottom: '10px' }}>
        Please direct any questions or requests for further information to the{' '}
        <a
          href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov"
          target="_blank"
          rel="noopener noreferrer"
        >
          CCDI mailbox
        </a>.
      </p>
    </div>
  </div>
);

export default ContactUsSection;
