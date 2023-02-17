 declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace Cypress {
     interface Chainable {
       login(credentials: Credentials): void; 
       createBlog(newBlog: NewBlog): void;
     }
   }
 }

 type Credentials = {
    username: string,
    password: string
 };

 Cypress.Commands.add('login', ({username, password}: Credentials)=> {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body));
        cy.visit('http://localhost:3000');
    });
 });
 
 type NewBlog = {
    title: string,
    author: string,
    url: string,
    likes?: number
 };

 Cypress.Commands.add('createBlog', (newBlog: NewBlog) => {
   const userToken = localStorage.getItem('loggedBlogappUser');
   if(userToken !== null){
     cy.request({
       url: 'http://localhost:3003/api/blogs',
       method: 'POST',
       body: newBlog,
       headers: {
         Authorization: `bearer ${JSON.parse(userToken).token}`
       }
     });
   }
   cy.visit('http://localhost:3000');
 });

 export {};