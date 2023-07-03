import {ContractType} from "./contract-type";

export interface Contract {
  id:                        number;
  contractNumber:            string;
  contractorContractNumber?: string;
  contractSubject:           string;
  contractType?:             ContractType;
  expDate?:                  string;
  paymentTerms?:             string;
}
