import {Wrapper} from "./wrapper";
import {ContractType} from "./contract-type";

export interface Contract extends Wrapper {
  id:                        number;
  contractNumber:            string;
  contractorContractNumber?: string;
  contractSubject:           string;
  contractType?:             ContractType;
  expDate?:                  Date;
  paymentTerms?:             string;
}
