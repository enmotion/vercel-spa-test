import * as R from "ramda";
import type { DrawerFormProps } from "@typs/app-public";
import type { VXF_JSON } from "vmo-x-form";
import createProblemForm from "./type-forms/createForm";
import { VmoTree } from "vmo-tree";

export const drawerFormProps: DrawerFormProps<{}> = {
	create: {
		drawer: {
			title: "创建亮点集",
			size: "60%",
			class: "rounded-l",
			appendToBody: false,
			bodyClass: "flex-col grow-1",
			destroyOnClose: true,
		},
		form: createProblemForm,
	},
	edit: {
		drawer: {
			title: "编辑亮点集",
			size: "60%",
			class: "rounded-l",
			bodyClass: "flex-col grow-1",
			destroyOnClose: true,
		},
		form: createProblemForm,
	},
	view: {
		drawer: {
			title: "编辑亮点集",
			size: "60%",
			class: "rounded-l",
			bodyClass: "flex-col grow-1",
			destroyOnClose: true,
		},
		form: R.mergeDeepRight(createProblemForm,{props:{disabled:true}}),
	},
};
