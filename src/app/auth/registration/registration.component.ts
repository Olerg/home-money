import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
    selector: 'wfm-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    form!: FormGroup;
    constructor(private usersService: UsersService, private router: Router, private title: Title) {
        title.setTitle('Регистрация');
    }

    ngOnInit() {
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]/*, this.forbiddenEmails.bind(this)*/),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'name': new FormControl(null, [Validators.required]),
            'agree': new FormControl(false, [Validators.requiredTrue])
        });
    }

    onSubmit() {
        console.log(this.form);
        const { email, password, name } = this.form.value;
        const user = new User(email, password, name);
        this.usersService.createNewUser(user)
            .subscribe((user: User) => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        nowCanLogin: true
                    }
                });
            });
    }

    /*forbiddenEmails(control: FormControl): Promise<any> {
        return new Promise((resolve, reject) => {
            this.usersService.getUserByEmail(control.value)
                .subscribe((user: User) => {
                    console.log(user);
                    if (user) {
                        resolve({ forbiddenEmail: true });
                    } else {
                        resolve(null);
                    }
                });
        });
    }*/

}
