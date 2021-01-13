import page from "page";

import Login from "@/pages/account/Login.svelte";
import SignUp from "@/pages/account/SignUp.svelte";
import NotesList from "@/pages/NotesList.svelte";
import Note from "@/pages/Note.svelte";
import Notfound from "@/pages/Notfound.svelte";

import { routeCurrent, routeParams } from "@/store/routerState.js";
import { usr } from "@/store/state";
import { get } from "svelte/store";

export default () => {
  page(
    "/",
    (ctx, next) => {
      if (get(usr) !== null) page.redirect("/dashboard");
      routeParams.set("");
      next();
    },
    () => routeCurrent.set(Login)
  );
  page(
    "/signup",
    (ctx, next) => {
      if (get(usr) !== null) page.redirect("/dashboard");
      routeParams.set("");
      next();
    },
    () => routeCurrent.set(SignUp)
  );
  page(
    "/dashboard",
    (ctx, next) => {
      if (get(usr) === null) page.redirect("/");
      routeParams.set("");
      next();
    },
    () => routeCurrent.set(NotesList)
  );
  page(
    "/dashboard/note/:id",
    (ctx, next) => {
      if (get(usr) === null) page.redirect("/");
      routeParams.set(ctx.params);
      next();
    },
    () => routeCurrent.set(Note)
  );
  page("*", () => routeCurrent.set(Notfound));

  page.start();
};
