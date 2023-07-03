import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AccountService} from '../../services';
import {User} from "../../entities/user";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  users?: User[];
  isDeleting: boolean[] = [];
  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  deleteUser(username: string) {
    const user = this.users!.find(x => x.username === username);
    if(user) {
      this.isDeleting[user.id] = true;
      this.accountService.delete(username)
        .pipe(first())
        .subscribe(() => this.users = this.users!.filter(x => x.username !== username));
    }
  }
}
