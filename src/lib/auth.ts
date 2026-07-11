import { betterAuth } from "better-auth";
// import { admin, jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("AreaAlert");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  // baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ["http://localhost:3000"],

  //   user: {
  //     additionalFields: {
  //       initialRole: {
  //         type: "string",
  //         required: false,
  //       },
  //       plan: {
  //         type: "string",
  //         required: false,
  //         defaultValue: "free",
  //       },
  //       isBlocked: {
  //         type: "boolean",
  //         required: false,
  //         defaultValue: false,
  //       },
  //     },
  //   },
  //   databaseHooks: {
  //     user: {
  //       create: {
  //         before: async (user) => {
  //           if (user.initialRole) {
  //             user.role = user.initialRole;
  //           }
  //           return { data: user };
  //         },
  //       },
  //     },
  //   },
  //   session: {
  //     cookieCache: {
  //       enabled: true,
  //       strategy: "jwt",
  //       maxAge: 60 * 24 * 30, // 30 days
  //     },
  //   },
  //   plugins: [admin(), jwt()],
});
