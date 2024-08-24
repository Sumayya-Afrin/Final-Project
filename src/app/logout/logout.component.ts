import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [ConfirmDialogComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    public loginService: LoginServiceService
  ) {}

  openConfirmDialog(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message },
    });

    return dialogRef.afterClosed().toPromise();
  }
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  async ngOnInit() {
    const confirmed = await this.openConfirmDialog(
      'Are you sure you want to logout?'
    );
    if (confirmed) {
      console.log('logging out...');

      this.loginService.loginSuccess = false;

      localStorage.clear();
      this.router
        .navigate([`/`])
        .then(() => this.openSnackBar(`logged Out successfully.`, 'ok'));
    } else {
      this.router.navigate(['/Crafts']);
    }
  }
}
