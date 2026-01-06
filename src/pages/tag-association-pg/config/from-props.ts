import * as R from "ramda";
import type { DrawerFormProps } from "@typs/app-public";
import type { VXF_JSON } from "vmo-x-form";
import createUserForm from "./type-forms/createForm";
import { VmoTree } from "vmo-tree";

export const drawerFormProps: DrawerFormProps<{}> = {
	create: {
		drawer: {
			title: "创建用户",
			size: "60%",
			class: "rounded-l",
			appendToBody: false,
			bodyClass: "flex-col grow-1",
			destroyOnClose: true,
		},
		form: createUserForm,
	},
	edit: {
		drawer: {
			title: "编辑用户",
			size: "60%",
			class: "rounded-l",
			bodyClass: "flex-col grow-1",
			destroyOnClose: true,
		},
		form: createUserForm,
	},
};
