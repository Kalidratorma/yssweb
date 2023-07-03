import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {Contract} from "../../entities/contract";
import {ContractService} from "../../services";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  contracts?: Contract[];
  isDeleting: boolean[] = [];

  constructor(private contractService: ContractService) {
  }

  ngOnInit() {
    this.contractService.getAll()
      .pipe(first())
      .subscribe(contracts => this.contracts = contracts);
  }

  delete(id: number) {
    const contract = this.contracts!.find(x => x.id === id);
    if(contract) {
      this.isDeleting[contract.id] = true;
      this.contractService.delete(id)
        .pipe(first())
        .subscribe(() => this.contracts = this.contracts!.filter(x => x.id !== id));
    }
  }
}
