import type { VXF_JSON, VXF_PUB } from "vmo-x-form";
import type { DrawerProps } from "element-plus";
import type { StyleValue } from "vue";
export type DrawerFormProps<T> = Record<
	string,
	{
		drawer: Partial<DrawerProps & { class: string; style: StyleValue }>;
		form: VXF_JSON.CompProp<T>;
	}
>;
export type DrawerItemFormProps<T> = {
  drawer: Partial<DrawerProps & { class: string; style: StyleValue }>;
  form: VXF_JSON.CompProp<T>;
};
