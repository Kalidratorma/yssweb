import {ContractType} from "./contract-type";

/**
 * Договор
 */
export interface Contract {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Номер договора
   */
  contractNumber: string;

  /**
   * Номер договора контрагента
   */
  contractorContractNumber?: string;

  /**
   * Предмет договора
   */
  contractSubject: string;

  /**
   * Тип договора
   */
  contractType?: ContractType;

  /**
   * Срок действия договора
   */
  expDate?: string;

  /**
   * Условия оплаты
   */
  paymentTerms?: string;
}
