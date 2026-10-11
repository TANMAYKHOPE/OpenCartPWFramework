# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/users.api.schema.spec.ts >> @smoke GET -- get all users
- Location: tests/api/users.api.schema.spec.ts:84:1

# Error details

```
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

# Test source

```ts
  1  | //chapter 2
  2  | 
  3  | import { APIRequestContext } from "@playwright/test";
  4  | 
  5  | export class ApiHelper {
  6  | 
  7  |     private readonly request: APIRequestContext;
  8  |     private readonly baseURL: string;
  9  | 
  10 |     constructor(request: APIRequestContext, baseURL: string) {
  11 |         this.request = request;
  12 |         this.baseURL = baseURL;
  13 |     }
  14 | 
  15 | 
  16 |     //GET
  17 |     async get(endPoint: string, headers?: Record<string, string>) {
  18 |         let response = await this.request.get(`${this.baseURL}${endPoint}`, {
  19 |             headers: headers
  20 |         });
  21 |         //console.log('API GET response: ', response);
  22 |         return {
  23 |             status: response.status(),
> 24 |             body: await response.json()
     |                   ^ SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
  25 |         }
  26 |     }
  27 | 
  28 |     //POSt
  29 |     async post(endPoint: string, data: object, headers?: Record<string, string>) {
  30 |         let response = await this.request.post(`${this.baseURL}${endPoint}`, {
  31 |             data: data,
  32 |             headers: headers
  33 |         });
  34 |         return {
  35 |             status: response.status(),
  36 |             body: await response.json()
  37 |         }
  38 |     }
  39 | 
  40 | 
  41 |     //PUT
  42 |     async put(endPoint: string, data: object, headers?: Record<string, string>) {
  43 |         let response = await this.request.put(`${this.baseURL}${endPoint}`, {
  44 |             data: data,
  45 |             headers: headers
  46 |         });
  47 |         return {
  48 |             status: response.status(),
  49 |             body: await response.json()
  50 |         }
  51 |     }
  52 | 
  53 |     //Delete
  54 |     async delete(endPoint: string, headers?: Record<string, string>) {
  55 |         let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
  56 |             headers: headers
  57 |         });
  58 |         return {
  59 |             status: response.status()
  60 |         }
  61 |     }
  62 | 
  63 | }
```