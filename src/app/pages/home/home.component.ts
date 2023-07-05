import {Component} from "@angular/core";
import {User} from "../../entities/user";
import {AccountService} from "../../services";

@Component({templateUrl: 'home.component.html'})
export class HomeComponent {
  user: User | null;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
}
