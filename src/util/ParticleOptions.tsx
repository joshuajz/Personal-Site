import { ISourceOptions } from "@tsparticles/engine";

const twoxlOptions: ISourceOptions = {
	background: {
		color: "f0f0f0",
	},
	fullScreen: {enable: false, zIndex: 0},
	style: {height: '100vh', width: '100%'},
	particles: {
		color: {
			value: '#F4A261'
		},
			number: {
				value: 40,
			},
			links: {
				distance: 200,
				enable: true,
				color: "#A4451A"
			},
			move: {
				enable: true,
			},
			size: {
				value: 1,
			},
			shape: {
				type: "circle",
			},
	},
};

const xlOptions: ISourceOptions = {
	background: {
		color: "f0f0f0",
	},
	fullScreen: {enable: false, zIndex: 0},
	style: {height: '100vh', width: '100%'},
	particles: {
		color: {
			value: '#F4A261'
		},
			number: {
				value: 40,
			},
			links: {
				distance: 150,
				enable: true,
				color: "#A4451A"
			},
			move: {
				enable: true,
			},
			size: {
				value: 1,
			},
			shape: {
				type: "circle",
			},
	},
};

const lgOptions: ISourceOptions = {
	background: {
		color: "f0f0f0",
	},
	fullScreen: {enable: false, zIndex: 0},
	style: {height: '100vh', width: '100%'},
	particles: {
		color: {
			value: '#F4A261'
		},
			number: {
				value: 40,
			},
			links: {
				distance: 120,
				enable: true,
				color: "#A4451A"
			},
			move: {
				enable: true,
			},
			size: {
				value: 1,
			},
			shape: {
				type: "circle",
			},
	},
};

const mdOptions: ISourceOptions = {
	background: {
		color: "f0f0f0",
	},
	fullScreen: {enable: false, zIndex: 0},
	style: {height: '100vh', width: '100%'},
	particles: {
		color: {
			value: '#F4A261'
		},
			number: {
				value: 40,
			},
			links: {
				distance: 100,
				enable: true,
				color: "#A4451A"
			},
			move: {
				enable: true,
			},
			size: {
				value: 1,
			},
			shape: {
				type: "circle",
			},
	},
};

const smOptions: ISourceOptions = {
	background: {
		color: "f0f0f0",
	},
	fullScreen: {enable: false, zIndex: 0},
	style: {height: '100vh', width: '100%'},
	particles: {
		color: {
			value: '#F4A261'
		},
			number: {
				value: 40,
			},
			links: {
				distance: 60,
				enable: true,
				color: "#A4451A"
			},
			move: {
				enable: true,
			},
			size: {
				value: 1,
			},
			shape: {
				type: "circle",
			},
	},
};

const mobileOptions: ISourceOptions = {
	background: {
		color: "f0f0f0",
	},
	fullScreen: {enable: false, zIndex: 0},
	style: {height: '100vh', width: '100%'},
	particles: {
		color: {
			value: '#F4A261'
		},
			number: {
				value: 20,
			},
			links: {
				distance: 60,
				enable: true,
				color: "#A4451A"
			},
			move: {
				enable: true,
			},
			size: {
				value: 1,
			},
			shape: {
				type: "circle",
			},
	},
};

export const options = {'xl': xlOptions, 'lg': lgOptions, 'md': mdOptions, 'sm': smOptions, 'mobile': mobileOptions, '2xl': twoxlOptions}
