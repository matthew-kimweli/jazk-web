import { Injectable } from '@angular/core';
import * as Parse from 'parse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  profilePic: any;
  API_publicKey: any = 'FLWPUBK-7afc4b59480f8b877171efc7579dd624-X';

  constructor() { 

    this.refreshUser()
  }

  refreshUser(){

    setTimeout(() => {
      if(this.currentUser){
        this.currentUser.fetch()
      }
    
    }, 3000);
  }


  get currentUser() {
    return Parse.User.current()
  }

  get currentUserName() {
    if(this.currentUser){
      return this.currentUser.get('name')
    }
    return ''
  }

  get currentAgentCode() {
    if(this.currentUser){
      return this.currentUser.get('agentCode')
    }
    return ''
  }


  get currentLoginUserName() {
    if(this.currentUser){
      return this.currentUser.get('username')
    }
    return ''
  }


  get currentUserType() {
    if(this.currentUser){
      return this.currentUser.get('userType')
    }
    return ''
  }

  get currentUserApprovalStatus() {
    if(this.currentUser){
      // console.log('status', this.currentUser.get('approvedStatus'))
      return this.currentUser.get('approvedStatus')
    }
    return ''
  }

  get currentUserDepartment() {
    if(this.currentUser){
      return this.currentUser.get('department')
    }
    return ''
  }

  get currentUserPic() {
    if(this.currentUser){
      return this.currentUser.get('image')
    }
    return ''
  }

  get currentUserId() {
    if(this.currentUser){
      return this.currentUser.id
    }
    return ''
  }

  get currentUserBalance() {
    if(this.currentUser){
      return this.currentUser.get('walletBalance') || 0
    }
    return ''
  }

  
  get isNormalUser() {
    if (this.isFinance) {
      return false;
    }
    return this.currentUserType == "normal";
  }

  get isLineManager() {
    if (this.isFinance) {
      return false;
    }
    return this.currentUserType == "manager";
  }

  get isFinance() {
    // return this.auth.currentUserDepartment == 'FINANCE'
    return this.currentUserType == "finance";
  }

  get isCEO() {
    return this.currentUserType == "ceo";
  }

  isAdmin(){
    if(this.currentUser){
      return this.currentUser.get('admin')
    }
    return false;
  }
  

  async sendEMail(params: { to: string; subject: string; html: string; }) {
    try {
      await Parse.Cloud.run('sendMail', params)
      console.log('email sent', params.to)
    } catch (error) {
      console.error(error)
    }
  }


  async logout() {
    try {
      await Parse.User.logOut()
      return true;
    } catch (error) {
      return false;
    }
  }


  async getUser(phone:any) {

    let query = new Parse.Query(Parse.User)
    query.equalTo('phone', phone)
    let first = await query.first()
    return first;
  }
}
