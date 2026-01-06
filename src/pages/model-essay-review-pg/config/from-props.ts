import * as R from "ramda";
import type { DrawerFormProps } from "@typs/app-public";
import type { VXF_JSON } from "vmo-x-form";
import createProblemForm from "./type-forms/createForm";
import { VmoTree } from "vmo-tree";

export const drawerFormProps: DrawerFormProps<{}> = {	
	edit: {
		drawer: {
			title: "编辑范文",
			size: "100%",
			class: "rounded-l",
			bodyClass: "flex-col grow-1",
			destroyOnClose: true,
		},
		form: createProblemForm,
	},
	view: {
		drawer: {
			title: "查看范文",
			size: "100%",
			class: "rounded-l",
			bodyClass: "flex-col grow-1",
			destroyOnClose: true,
		},
		form: R.mergeDeepRight(createProblemForm,{props:{disabled:true}}),
	},
};
