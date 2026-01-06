declare namespace Transtion {
	export type name =
		| "zoomin"
		| "fade"
		| "zoombounce"
		| "scalex"
		| "scaley"
		| "pushx"
		| "pushy"
		| "growy"
		| "growx"
		| "flipx"
		| "flipy"
		| "scrollup"
		| "scrolldown"
		| "scrollleft"
		| "scrollright"
		| "falling"
		| "blur";
	export type mode = "out-in" | "in-out" | "default";
	export type align = "col" | "row";
	export type timing =
		| "ease"
		| "ease-in"
		| "ease-out"
		| "ease-in-out"
		| number[];
	export type tag = "ul" | "div" | "section" | "span";
	export type Props = {
		name: name;
		mode: mode;
		duration: number | { enter: number; leave: number };
		timing: timing | { enter: timing; leave: timing };
		disabled: boolean;
		absoluteCell: boolean;
		perspective: number | "none";
	};
}
export default Transtion;
