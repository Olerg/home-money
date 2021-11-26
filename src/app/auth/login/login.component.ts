import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
    selector: 'wfm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    message!: Message;

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.message = new Message('danger', '');
        this.route.queryParams
            .subscribe((params: Params) => {
                if (params['nowCanLogin']) {
                    this.showMessage({ text: 'Теперь вы можете зайти в систему', type: 'success' });
                }
            });

        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    private showMessage(message: Message) {
        this.message = message;
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);

    }

    onSubmit() {
        const formData = this.form.value;

        this.usersService.getUserByEmail(formData.email)
            .subscribe((user: User) => {
                if (user) {
                    if (user.password === formData.password) {
                        this.message.text = '';
                        window.localStorage.setItem('user', JSON.stringify(user));
                        this.authService.login();
                        this.router.navigate(['/system','bill']);
                    } else {
                        this.showMessage({ text: 'Пароль не верный', type: 'danger' });
                    }
                } else {
                    this.showMessage({ text: 'Такого пользователя не существует', type: 'danger' });
                }

            })
    }

}
