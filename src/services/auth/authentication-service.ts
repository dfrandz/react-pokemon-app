export default class AuthenticationService {

    static isAuthenticated:boolean = false;
  
    static login(username: string, password: string): Promise<boolean> {
      const isAuthenticated1 = (username === 'pikachu' && password === 'pikachu');
      console.log(isAuthenticated1)
      return new Promise(resolve => {
        setTimeout(() => {
          this.isAuthenticated = isAuthenticated1;
          resolve(isAuthenticated1);
        }, 1000);
      });
    }
  }