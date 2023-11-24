import gql from 'graphql-tag';
import { cellTypes, dataFormatTypes } from '@bento-core/table';
import { types, btnTypes } from '@bento-core/paginated-table';
import { customMyFilesTabDownloadCSV } from './tableDownloadCSV';
import cartLogo from '../assets/header/Cart_Logo.svg';
import cartPageLogo from '../assets/cart/Cart_Page_Icon.svg';
import cartQuestionIcon from '../assets/cart/Question_Icon.svg';

export const navBarCartData = {
  cartLabel: 'Cart',
  cartLink: '/fileCentricCart',
  cartIcon: cartLogo,
  cartIconAlt: 'cart_logo',
};

// --------------- Files limit configuration --------------
export const alertMessage = 'The cart is limited to 6000 files. Please narrow the search criteria or remove some files from the cart to add more.';
export const maximumNumberOfFilesAllowedInTheCart = 6000;

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: cartQuestionIcon,
  alt: 'tooltipIcon',
  clsName: 'tooltip_icon',
  myFiles: 'To access and analyze files: select and remove unwanted files, click the "Download Manifest" button, and upload the resulting manifest file to your Cancer Genomics Cloud (CGC) account.',
  arrow: true,
  styles: {
    border: '#03A383 1px solid',
  },
};

//BENTO-2455 Configuration set for Bento 4.0.
export const myFilesPageData = {
  manifestFileName: 'CCDI Inventory File Manifest',
  tooltipIcon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  tooltipAlt: 'tooltip icon',
  tooltipMessage: 'To access and analyze files: select and remove unwanted files, click the "Download Manifest" button, and upload the resulting manifest file to your Cancer Genomics Cloud (CGC) account.',
  errorMessage: 'An error has occurred in loading CART',
  layout: [
    {
      container: 'outer_layout',
      size: 'xl',
      clsName: 'container_outer_layout',
      items: [
        {
          clsName: 'cart_icon',
          type: types.ICON,
          src: cartPageLogo,
          alt: 'Bento MyFiles header logo',
        },
        // {
        //   clsName: 'cart_header_text',
        //   text: 'Cart >',
        //   type: types.TEXT,
        // },
        {
          clsName: 'cart_sel_files_text',
          text: 'MY FILES',
          type: types.TEXT,
        },
      ],
    },
    {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_header',
    items: [
      {
        title: 'DOWNLOAD MANIFEST',
        clsName: 'download_manifest',
        type: types.BUTTON,
        role: btnTypes.DOWNLOAD_MANIFEST,
        btnType: btnTypes.DOWNLOAD_MANIFEST,
        tooltipCofig: tooltipContent,
      }],
  },
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
  // {
  //   container: 'buttons',
  //   size: 'xl',
  //   clsName: 'container_footer',
  //   items: [
  //     {
  //       clsName: 'manifest_comments',
  //       type: types.TEXT_INPUT,
  //       placeholder: 'Please add a description for the CSV file you are about to download.',
  //     }],
  // }
  ]
};


export const manifestData = {
  keysToInclude: ['guid', 'file_name', 'participant_id', 'md5sum'],
  header: ['drs_uri', 'name', 'Participant Id', 'Md5sum'],
};

// --------------- GraphQL query - Retrieve selected cases info --------------
export const GET_MY_CART_DATA_QUERY = gql`
query filesInList($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name", $sort_direction:String="asc") {
    filesInList(id: $file_ids, offset: $offset,first: $first, order_by: $order_by, sort_direction: $sort_direction) {
        id
        file_id
        file_name
        study_short_title
        phs_accession
        participant_id
        sample_id
        file_type
        file_size
        md5sum
        guid
    }
}`;

// --------------- File table configuration --------------

export const table = {
  dataField: 'filesInList',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  api: GET_MY_CART_DATA_QUERY,
  defaultSortDirection: 'asc',
  paginationAPIField: 'filesInList',
  tableDownloadCSV: customMyFilesTabDownloadCSV,
  columns: [
    {
      dataField: 'file_name',
      header: 'File Name',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'study_short_title',
      header: 'Study Short Title',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'phs_accession',
      header: 'Study Accession',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'participant_id',
      header: 'Participant ID',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'sample_id',
      header: 'Sample ID',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_type',
      header: 'File Type',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_size',
      header: 'File Size',
      // set formatBytes to true to display file size (in bytes) in a more human readable format
      display: true,
      dataFormatType: dataFormatTypes.FORMAT_BYTES,
      cellType: cellTypes.FORMAT_DATA,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_id',
      header: 'UUID',
      display: false,
      tooltipText: 'sort',
    },
    {
      cellType: cellTypes.DELETE,
      headerType: cellTypes.DELETE,
      display: true,
    },
  ],
  tableMsg: {
    noMatch: 'No Matching Records Found',
  },
};

