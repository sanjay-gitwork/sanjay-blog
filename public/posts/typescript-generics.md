---
title: "Mastering TypeScript Generics"
date: "March 6, 2026"
category: "Engineering"
tags: ["typescript", "javascript", "web-dev"]
---

Generics are one of the most powerful features of TypeScript, allowing you to create reusable, type-safe components. In this guide, we'll explore how they work and when to use them.

## 1. What are Generics?

Generics allow you to define a component (function, class, or interface) that can work with a variety of types rather than a single one. This allows users to consume these components and use their own types.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
// Type of output is 'string'
```

## 2. Generic Constraints

Sometimes you want to limit what types a generic can accept. You can do this using the `extends` keyword.

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

## 3. Real-World Example: API Wrapper

```typescript
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

interface User {
  id: number;
  name: string;
}

const user = await fetchData<User>("/api/user/1");
console.log(user.name); // Type-safe!
```

## 4. Conclusion

Generics provide the flexibility of `any` with the safety of explicit types. Mastering them is key to becoming a senior TypeScript developer.
