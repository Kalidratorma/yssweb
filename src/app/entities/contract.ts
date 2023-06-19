export interface Contract {
  id?:                       number;
  contractNumber?:           string;
  contractorContractNumber?: null;
  contractSubject?:          string;
  contractType?:             string;
  expDate?:                  Date;
  paymentTerms?:             string;
}
