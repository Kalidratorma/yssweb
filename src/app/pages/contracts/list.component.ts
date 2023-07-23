import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Contract, ContractType, getContractTypeMap} from "../../entities";
import {ContractService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  contracts?: Contract[];
  isDeleting: boolean[] = [];
  contractTypeMap: Map<ContractType, string> = getContractTypeMap();

  constructor(private contractService: ContractService) {
  }

  ngOnInit() {
    this.contractService.getAll()
      .pipe(first())
      .subscribe(contracts => this.contracts = contracts.sort(
        (a: Contract, b: Contract) => {
          const contractNumberA = a.contractNumber.toUpperCase();
          const contractNumberB = b.contractNumber.toUpperCase();
          const contractTypeA = a.contractType ? a.contractType.toUpperCase() : '';
          const contractTypeB = b.contractType ? b.contractType.toUpperCase() : '';
          const expDateA = a.expDate ? a.expDate.toUpperCase() : '';
          const expDateB = b.expDate ? b.expDate.toUpperCase() : '';
          return (contractNumberA < contractNumberB) ? -1 : (contractNumberA > contractNumberB) ? 1 :
            (contractTypeA < contractTypeB) ? -1 : (contractTypeA > contractTypeB) ? 1 :
              (expDateA < expDateB) ? -1 : (expDateA > expDateB) ? 1 : 0;
        }));
  }

  delete(id: number) {
    const contract = this.contracts!.find(x => x.id === id);
    if (contract) {
      this.isDeleting[contract.id] = true;
      this.contractService.delete(id)
        .pipe(first())
        .subscribe(() => this.contracts = this.contracts!.filter(x => x.id !== id));
    }
  }
}
