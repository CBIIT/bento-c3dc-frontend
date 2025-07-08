// components/ExploreUserGuide/CartManifestSection.js
import React from 'react';
import figure12 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure13 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';
import figure14 from '../../../../assets/explore/C3DCFacetLocalFindSearchIcon.svg';

const CartManifestSection = ({ classes }) => (
  <div>
    <div id='Creating an Exportable File Manifest from the Cart' className={classes.sectionTitle}>
      <p>Creating an Exportable File Manifest from the Cart</p>
    </div>
    <div className={classes.contentContainer}>
      <p>
        In addition to study-specific downloads, you can export each row-level metadata element for CCDI participants, diagnoses, samples, or files using the Explore Dashboard:
      </p>
      <ol>
        <li>Select one or more metadata rows from the result tables using checkboxes.</li>
        <li>
          Add files to the My Files cart by clicking “ADD ALL FILTERED FILES” or “ADD SELECTED FILES” (Figure 12).
          <div className={classes.figureContainer}><img src={figure12} style={{ width: '80%' }} alt='Figure12' /></div>
          <div className={classes.figureText}>Figure 12: Add files to the cart for the “Participants” table</div>
        </li>
        <li>
          Navigate to “MY FILES” or click the cart icon on the top menu (Figure 13).
          <div className={classes.figureContainer}><img src={figure13} style={{ width: '80%' }} alt='Figure13' /></div>
          <div className={classes.figureText}>Figure 13: Access the My Files cart</div>
        </li>
        <li>
          In the cart, click “DOWNLOAD MANIFEST” from the “AVAILABLE EXPORT OPTIONS” dropdown (Figure 14).
          <div className={classes.figureContainer}><img src={figure14} style={{ width: '90%' }} alt='Figure14' /></div>
          <div className={classes.figureText}>Figure 14: Downloading the manifest from the cart</div>
        </li>
        <li>
          You can also choose “EXPORT TO CANCER GENOMICS CLOUD” to send the manifest directly to CGC.
        </li>
      </ol>
      <p>
        Note: The cart supports up to 200,000 files. For larger exports, create multiple batches or use the Studies tab for metadata downloads.
      </p>
    </div>
  </div>
);

export default CartManifestSection;