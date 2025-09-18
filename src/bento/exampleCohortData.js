/**
 * Example cohort data for Cohort Analyzer exploration
 * Contains 3 pre-configured cohorts with interesting biological/clinical comparisons
 */

export const exampleCohorts = [
  {
    cohortId: "Example Cohort 1",
    cohortDescription: "Participants with Ganglioglioma NOS who underwent surgical treatment - demonstrating low-grade tumor characteristics and treatment outcomes",
    participants: [
      { participant_id: "PBBPGL", dbgap_accession: "phs002790", participant_pk: "1166d3b5-d1be-516b-8c6b-98814ea4539b", id: "1166d3b5-d1be-516b-8c6b-98814ea4539b"},
      { participant_id: "PBBSTM", dbgap_accession: "phs002790", participant_pk: "7572ae22-fe2d-5a82-852a-d676b22f3ca9", id: "7572ae22-fe2d-5a82-852a-d676b22f3ca9"},
      { participant_id: "PBBRIL", dbgap_accession: "phs002790", participant_pk: "39c22b48-c4b0-5ca6-8813-2f038d12424e", id: "39c22b48-c4b0-5ca6-8813-2f038d12424e"},
      { participant_id: "PBBUXY", dbgap_accession: "phs002790", participant_pk: "5849bc2a-4e79-5d9e-a9f5-535feb3df348", id: "5849bc2a-4e79-5d9e-a9f5-535feb3df348"},
      { participant_id: "PBBSZR", dbgap_accession: "phs002790", participant_pk: "d1e9ff40-d294-5e52-b6e2-88027ae9309f", id: "d1e9ff40-d294-5e52-b6e2-88027ae9309f"},
      { participant_id: "PBBLLB", dbgap_accession: "phs002790", participant_pk: "8e3df662-2bd3-5940-807f-efc800f81f4b", id: "8e3df662-2bd3-5940-807f-efc800f81f4b"},
      { participant_id: "PBBPPY", dbgap_accession: "phs002790", participant_pk: "cbc85280-b477-55b9-8be9-dda65bdbd081", id: "cbc85280-b477-55b9-8be9-dda65bdbd081"},
      { participant_id: "PBBKXM", dbgap_accession: "phs002790", participant_pk: "5aea3050-6224-525d-88ae-aab0f2af1598", id: "5aea3050-6224-525d-88ae-aab0f2af1598"},
      { participant_id: "PBBNGE", dbgap_accession: "phs002790", participant_pk: "5b3e4d32-3591-569e-b1c3-de73f33e889c", id: "5b3e4d32-3591-569e-b1c3-de73f33e889c"},
      { participant_id: "PBBIJB", dbgap_accession: "phs002790", participant_pk: "8598143d-19b8-57cb-9b6e-f9b09803e7d5", id: "8598143d-19b8-57cb-9b6e-f9b09803e7d5"},
      { participant_id: "PBBRJF", dbgap_accession: "phs002790", participant_pk: "dd7aeba3-b911-541e-8864-0b5960a87bd8", id: "dd7aeba3-b911-541e-8864-0b5960a87bd8"},
      { participant_id: "PBBWJX", dbgap_accession: "phs002790", participant_pk: "fb9e7899-c9e7-5806-8594-8b487008737b", id: "fb9e7899-c9e7-5806-8594-8b487008737b"},
      { participant_id: "PBBMYK", dbgap_accession: "phs002790", participant_pk: "5650c022-63f9-5a7e-adca-2cfe2abe142b", id: "5650c022-63f9-5a7e-adca-2cfe2abe142b"},
      { participant_id: "PBBUKV", dbgap_accession: "phs002790", participant_pk: "66a87ca8-86e3-500a-a306-8f5413fc899b", id: "66a87ca8-86e3-500a-a306-8f5413fc899b"},
      { participant_id: "PBBNFS", dbgap_accession: "phs002790", participant_pk: "62e43024-9621-5e87-a1bb-e87d0cd8b93e", id: "62e43024-9621-5e87-a1bb-e87d0cd8b93e"},
      { participant_id: "PBBPWE", dbgap_accession: "phs002790", participant_pk: "5fc4ffde-6e0f-596c-b736-d39c73afe3b0", id: "5fc4ffde-6e0f-596c-b736-d39c73afe3b0"},
      { participant_id: "PBBNHL", dbgap_accession: "phs002790", participant_pk: "7ee27ded-8191-502c-b12a-c411586738f7", id: "7ee27ded-8191-502c-b12a-c411586738f7"},
      { participant_id: "PBBRXN", dbgap_accession: "phs002790", participant_pk: "36923738-89ea-5af9-b762-13e097a7ab23", id: "36923738-89ea-5af9-b762-13e097a7ab23"},
      { participant_id: "PBBSTE", dbgap_accession: "phs002790", participant_pk: "be578d53-3fae-5728-aef1-9561b172ae9b", id: "be578d53-3fae-5728-aef1-9561b172ae9b"},
      { participant_id: "PBBJGY", dbgap_accession: "phs002790", participant_pk: "6f9a2a5e-fd30-5656-882f-9586f0f43c9b", id: "6f9a2a5e-fd30-5656-882f-9586f0f43c9b"},
      { participant_id: "PBBNSG", dbgap_accession: "phs002790", participant_pk: "75137c1a-7d29-5d51-91b9-0d4510483e0d", id: "75137c1a-7d29-5d51-91b9-0d4510483e0d"},
      { participant_id: "PBBNFF", dbgap_accession: "phs002790", participant_pk: "8706b18e-443c-507c-b2e7-af360a6af3d9", id: "8706b18e-443c-507c-b2e7-af360a6af3d9"},
      { participant_id: "PBBNXT", dbgap_accession: "phs002790", participant_pk: "05f7d26a-1b0a-55e2-b716-7d984d11b4a0", id: "05f7d26a-1b0a-55e2-b716-7d984d11b4a0"},
      { participant_id: "PBBPME", dbgap_accession: "phs002790", participant_pk: "90753d41-1ec8-5536-bd66-fef13fb691dd", id: "90753d41-1ec8-5536-bd66-fef13fb691dd"}
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    cohortId: "Example Cohort 2",
    cohortDescription: "Participants with malignant Glioma treated with chemotherapy and immunotherapy - representing aggressive treatment approaches for high-grade tumors",
    participants: [
      {participant_id: "PBBIXN", dbgap_accession: "phs002790", participant_pk: "c0e4cb27-aee6-5850-9ce4-855af1cf09e3", id: "c0e4cb27-aee6-5850-9ce4-855af1cf09e3"},
      {participant_id: "PBBLWR", dbgap_accession: "phs002790", participant_pk: "35cea86f-3f76-58fc-b44a-62841098892a", id: "35cea86f-3f76-58fc-b44a-62841098892a"},
      {participant_id: "PBBMZW", dbgap_accession: "phs002790", participant_pk: "58ceb557-8411-5165-a9aa-d3bebc07160c", id: "58ceb557-8411-5165-a9aa-d3bebc07160c"},
      {participant_id: "PBBHYH", dbgap_accession: "phs002790", participant_pk: "b5cd2c71-ad70-5553-b46f-4073a31a88cd", id: "b5cd2c71-ad70-5553-b46f-4073a31a88cd"},
      {participant_id: "PBBMCU", dbgap_accession: "phs002790", participant_pk: "25d2439b-383f-50ac-93ee-cf96fe610fed", id: "25d2439b-383f-50ac-93ee-cf96fe610fed"},
      {participant_id: "PBBIGN", dbgap_accession: "phs002790", participant_pk: "d67eec7b-499a-53aa-a819-d19e1457d11d", id: "d67eec7b-499a-53aa-a819-d19e1457d11d"},
      {participant_id: "PBBIIW", dbgap_accession: "phs002790", participant_pk: "366b5a22-f4bf-5092-9c15-ba7f1f80de64", id: "366b5a22-f4bf-5092-9c15-ba7f1f80de64"},
      {participant_id: "PBBLPZ", dbgap_accession: "phs002790", participant_pk: "19505e69-002e-5f38-9b53-dbf084cf3fe0", id: "19505e69-002e-5f38-9b53-dbf084cf3fe0"},
      {participant_id: "PBBIXR", dbgap_accession: "phs002790", participant_pk: "9bf57eab-50d5-5d0e-87b2-2ee77ecc8d0d", id: "9bf57eab-50d5-5d0e-87b2-2ee77ecc8d0d"},
      {participant_id: "PBBMBK", dbgap_accession: "phs002790", participant_pk: "18cd45cc-272e-5d41-8552-1ab0aa282294", id: "18cd45cc-272e-5d41-8552-1ab0aa282294"},
      {participant_id: "PBBIUS", dbgap_accession: "phs002790", participant_pk: "201434ad-59da-54a0-adad-7346c6651099", id: "201434ad-59da-54a0-adad-7346c6651099"},
      {participant_id: "PBBHWP", dbgap_accession: "phs002790", participant_pk: "386c1e7c-cdd6-5112-a8d0-7ea8b2b014bb", id: "386c1e7c-cdd6-5112-a8d0-7ea8b2b014bb"},
      {participant_id: "PBBKKT", dbgap_accession: "phs002790", participant_pk: "02b3028f-a134-5543-a133-917f337c29bc", id: "02b3028f-a134-5543-a133-917f337c29bc"},
      {participant_id: "PBBMYI", dbgap_accession: "phs002790", participant_pk: "51b22e0f-3933-5d09-893c-3b4856b15c54", id: "51b22e0f-3933-5d09-893c-3b4856b15c54"},
      {participant_id: "PBBMCL", dbgap_accession: "phs002790", participant_pk: "91b3a902-f718-5ccb-9cdc-7bb0998ace3d", id: "91b3a902-f718-5ccb-9cdc-7bb0998ace3d"},
      {participant_id: "PBBJHS", dbgap_accession: "phs002790", participant_pk: "366f7a11-d5dd-5918-ae07-d2a29d083309", id: "366f7a11-d5dd-5918-ae07-d2a29d083309"},
      {participant_id: "PBBLFW", dbgap_accession: "phs002790", participant_pk: "6876f1d4-1a22-58ef-8edc-dd8b841bd247", id: "6876f1d4-1a22-58ef-8edc-dd8b841bd247"},
      {participant_id: "PBBMYD", dbgap_accession: "phs002790", participant_pk: "b39cdf4a-9c40-5b49-86ff-57f2d7c6c8c9", id: "b39cdf4a-9c40-5b49-86ff-57f2d7c6c8c9"},
      {participant_id: "PBBKKX", dbgap_accession: "phs002790", participant_pk: "a3d364f4-8ace-5394-ac6f-b9674ea56079", id: "a3d364f4-8ace-5394-ac6f-b9674ea56079"},
      {participant_id: "PBBKTU", dbgap_accession: "phs002790", participant_pk: "1593b255-b0e1-54bd-aa36-5e286dbdc743", id: "1593b255-b0e1-54bd-aa36-5e286dbdc743"},
      {participant_id: "PBBMNW", dbgap_accession: "phs002790", participant_pk: "d204e2a6-c84c-5597-8d59-c874d9dd2bd3", id: "d204e2a6-c84c-5597-8d59-c874d9dd2bd3"},
      {participant_id: "PBBKSG", dbgap_accession: "phs002790", participant_pk: "6fa4c630-d255-5c8f-b8e5-95c3524bcc37", id: "6fa4c630-d255-5c8f-b8e5-95c3524bcc37"},
      {participant_id: "PBBIUN", dbgap_accession: "phs002790", participant_pk: "f1073bd6-bee7-57e4-bc6b-a2e6b9d85ace", id: "f1073bd6-bee7-57e4-bc6b-a2e6b9d85ace"},
      {participant_id: "PBBKNA", dbgap_accession: "phs002790", participant_pk: "577a0370-ebd3-589e-9c9f-9df7878e12b8", id: "577a0370-ebd3-589e-9c9f-9df7878e12b8"},
      {participant_id: "PBBMCC", dbgap_accession: "phs002790", participant_pk: "66c82340-9e90-56da-91ac-f7afe3403475", id: "66c82340-9e90-56da-91ac-f7afe3403475"}
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    cohortId: "Example Cohort 3",
    cohortDescription: "Participants with malignant Glioma treated with radiation therapy - showcasing radiation-based treatment protocols for brain tumors",
    participants: [
      {participant_id: "PBBVDX", dbgap_accession: "phs002790", participant_pk: "78903a20-6f74-5fc6-922b-c6e7b0757664", id: "78903a20-6f74-5fc6-922b-c6e7b0757664"},
      {participant_id: "PBBTCS", dbgap_accession: "phs002790", participant_pk: "2bc4e116-00cc-53ea-bca0-6f6dca7812b8", id: "2bc4e116-00cc-53ea-bca0-6f6dca7812b8"},
      {participant_id: "PBBMZW", dbgap_accession: "phs002790", participant_pk: "58ceb557-8411-5165-a9aa-d3bebc07160c", id: "58ceb557-8411-5165-a9aa-d3bebc07160c"},
      {participant_id: "PBBRKP", dbgap_accession: "phs002790", participant_pk: "f78d5797-2c16-5079-aae0-05fb1482e333", id: "f78d5797-2c16-5079-aae0-05fb1482e333"},
      {participant_id: "PBBSIU", dbgap_accession: "phs002790", participant_pk: "ec66d0cc-1964-5eb8-b32b-21f72eca40dd", id: "ec66d0cc-1964-5eb8-b32b-21f72eca40dd"},
      {participant_id: "PBBNIZ", dbgap_accession: "phs002790", participant_pk: "9912eb9a-3477-5577-8bd8-3e80439652c5", id: "9912eb9a-3477-5577-8bd8-3e80439652c5"},
      {participant_id: "PBBTRI", dbgap_accession: "phs002790", participant_pk: "a507049e-84c7-5887-b6e8-a91f6f816cdd", id: "a507049e-84c7-5887-b6e8-a91f6f816cdd"},
      {participant_id: "PBBVPC", dbgap_accession: "phs002790", participant_pk: "7660a377-62ad-5e88-9277-47503387fb05", id: "7660a377-62ad-5e88-9277-47503387fb05"},
      {participant_id: "PBBLHT", dbgap_accession: "phs002790", participant_pk: "f48df510-197b-539a-afdb-9861f0b2d176", id: "f48df510-197b-539a-afdb-9861f0b2d176"},
      {participant_id: "PBBNCU", dbgap_accession: "phs002790", participant_pk: "1637be40-d0ea-54a1-965a-ea1d50a6f2b5", id: "1637be40-d0ea-54a1-965a-ea1d50a6f2b5"},
      {participant_id: "PBBVUD", dbgap_accession: "phs002790", participant_pk: "0a5eefbb-639e-5f10-877c-07f83de8c912", id: "0a5eefbb-639e-5f10-877c-07f83de8c912"},
      {participant_id: "PBBIUS", dbgap_accession: "phs002790", participant_pk: "201434ad-59da-54a0-adad-7346c6651099", id: "201434ad-59da-54a0-adad-7346c6651099"},
      {participant_id: "PBBVZJ", dbgap_accession: "phs002790", participant_pk: "35d366c2-4e37-5edf-9e59-b360ef8a5c6d", id: "35d366c2-4e37-5edf-9e59-b360ef8a5c6d"},
      {participant_id: "PBBHWP", dbgap_accession: "phs002790", participant_pk: "386c1e7c-cdd6-5112-a8d0-7ea8b2b014bb", id: "386c1e7c-cdd6-5112-a8d0-7ea8b2b014bb"},
      {participant_id: "PBBTED", dbgap_accession: "phs002790", participant_pk: "72903596-07bd-5916-9769-aadd2b4fa0a0", id: "72903596-07bd-5916-9769-aadd2b4fa0a0"},
      {participant_id: "PBBJHS", dbgap_accession: "phs002790", participant_pk: "366f7a11-d5dd-5918-ae07-d2a29d083309", id: "366f7a11-d5dd-5918-ae07-d2a29d083309"},
      {participant_id: "PBBLFW", dbgap_accession: "phs002790", participant_pk: "6876f1d4-1a22-58ef-8edc-dd8b841bd247", id: "6876f1d4-1a22-58ef-8edc-dd8b841bd247"},
      {participant_id: "PBBMYD", dbgap_accession: "phs002790", participant_pk: "b39cdf4a-9c40-5b49-86ff-57f2d7c6c8c9", id: "b39cdf4a-9c40-5b49-86ff-57f2d7c6c8c9"},
      {participant_id: "PBBKKX", dbgap_accession: "phs002790", participant_pk: "a3d364f4-8ace-5394-ac6f-b9674ea56079", id: "a3d364f4-8ace-5394-ac6f-b9674ea56079"},
      {participant_id: "PBBUNA", dbgap_accession: "phs002790", participant_pk: "ba158094-7f1a-5dc7-bd8c-617c92f20f0f", id: "ba158094-7f1a-5dc7-bd8c-617c92f20f0f"},
      {participant_id: "PBBKSG", dbgap_accession: "phs002790", participant_pk: "6fa4c630-d255-5c8f-b8e5-95c3524bcc37", id: "6fa4c630-d255-5c8f-b8e5-95c3524bcc37"},
      {participant_id: "PBBIUN", dbgap_accession: "phs002790", participant_pk: "f1073bd6-bee7-57e4-bc6b-a2e6b9d85ace", id: "f1073bd6-bee7-57e4-bc6b-a2e6b9d85ace"},
      {participant_id: "PBBRKJ", dbgap_accession: "phs002790", participant_pk: "12df9013-646b-53fb-b8e0-43b0ea94e687", id: "12df9013-646b-53fb-b8e0-43b0ea94e687"},
      {participant_id: "PBBMJP", dbgap_accession: "phs002790", participant_pk: "6c64fbc2-f171-5b0e-8d8e-9de0c1231e29", id: "6c64fbc2-f171-5b0e-8d8e-9de0c1231e29"}
    ],
    lastUpdated: new Date().toISOString(),
  }
];

/**
 * Example button configuration for UI text and tooltips
 */
export const exampleButtonConfig = {
  buttonText: "Add Example Cohorts",
  tooltip: {
    enabled: "Generate a set of example cohorts to explore the Cohort Analyzer",
    disabled: "Cannot add example cohorts. You have reached the maximum limit of 20 cohorts. Please delete some cohorts first."
  }
};