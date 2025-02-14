
let 快速訂閱訪問入口 = ['auto'];
let addresses = [];
let addressesapi = [];

let addressesnotls = [];
let addressesnotlsapi = [];

let addressescsv = [];
let DLS = 7;
let remarkIndex = 1;//CSV備註所在列偏移量

let subConverter = 'SUBAPI.cmliussss.net';
let subConfig = atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2NtbGl1L0FDTDRTU1IvbWFpbi9DbGFzaC9jb25maWcvQUNMNFNTUl9PbmxpbmVfRnVsbF9NdWx0aU1vZGUuaW5p');
let noTLS = 'false';
let link;
let 隧道版本作者 = atob('ZWQ=');
let 獲取代理IP;
let proxyIPs = [
	atob('cHJveHlpcC5meHhrLmRlZHluLmlv'),
];
let 匹配PROXYIP = []
let socks5DataURL = '';
let BotToken = '';
let ChatID = '';
let 臨時中轉域名 = [];
let 臨時中轉域名介面 = '';
let EndPS = '';
let 協議類型 = atob(`\u0056\u006b\u0078\u0046\u0055\u0031\u004d\u003d`);
let FileName = '優選訂閱生成器';
let SUBUpdateTime = 6;
let total = 24;
let timestamp = 4102329600000;
const regex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[.*\]):?(\d+)?#?(.*)?$/;
let fakeUserID;
let fakeHostName;
let httpsPorts = ["2053", "2083", "2087", "2096", "8443"];
let 有效時間 = 7;
let 更新時間 = 3;
let MamaJustKilledAMan = ['telegram', 'twitter', 'miaoko'];
let proxyIPPool = [];
let socks5Data;
let alpn = 'h3';
let 網路備案 = `<a href='https://t.me/CMLiussss'>萌ICP備-20240707號</a>`;//寫你自己的維護者廣告
let 額外ID = '0';
let 加密方式 = 'auto';
let 網站圖示, 網站頭像, 網站背景;
async function 整理優選列表(api) {
	if (!api || api.length === 0) return [];

	let newapi = "";

	// 創建一個AbortController對象，用於控制fetch請求的取消
	const controller = new AbortController();

	const timeout = setTimeout(() => {
		controller.abort(); // 取消所有請求
	}, 2000); // 2秒後觸發

	try {
		// 使用Promise.allSettled等待所有API請求完成，無論成功或失敗
		// 對api數組進行遍歷，對每個API地址發起fetch請求
		const responses = await Promise.allSettled(api.map(apiUrl => fetch(apiUrl, {
			method: 'get',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;',
				'User-Agent': FileName + atob('IGNtbGl1L1dvcmtlclZsZXNzMnN1Yg==')
			},
			signal: controller.signal // 將AbortController的信號量添加到fetch請求中，以便於需要時可以取消請求
		}).then(response => response.ok ? response.text() : Promise.reject())));

		// 遍歷所有響應
		for (const [index, response] of responses.entries()) {
			// 檢查響應狀態是否為'fulfilled'，即請求成功完成
			if (response.status === 'fulfilled') {
				// 獲取響應的內容
				const content = await response.value;

				const lines = content.split(/\r?\n/);
				let 節點備註 = '';
				let 測速埠 = '443';

				if (lines[0].split(',').length > 3) {
					const idMatch = api[index].match(/id=([^&]*)/);
					if (idMatch) 節點備註 = idMatch[1];

					const portMatch = api[index].match(/port=([^&]*)/);
					if (portMatch) 測速埠 = portMatch[1];

					for (let i = 1; i < lines.length; i++) {
						const columns = lines[i].split(',')[0];
						if (columns) {
							newapi += `${columns}:${測速埠}${節點備註 ? `#${節點備註}` : ''}\n`;
							if (api[index].includes('proxyip=true')) proxyIPPool.push(`${columns}:${測速埠}`);
						}
					}
				} else {
					// 驗證當前apiUrl是否帶有'proxyip=true'
					if (api[index].includes('proxyip=true')) {
						// 如果URL帶有'proxyip=true'，則將內容添加到proxyIPPool
						proxyIPPool = proxyIPPool.concat((await 整理(content)).map(item => {
							const baseItem = item.split('#')[0] || item;
							if (baseItem.includes(':')) {
								const port = baseItem.split(':')[1];
								if (!httpsPorts.includes(port)) {
									return baseItem;
								}
							} else {
								return `${baseItem}:443`;
							}
							return null; // 不符合條件時返回 null
						}).filter(Boolean)); // 過濾掉 null 值
					}
					// 將內容添加到newapi中
					newapi += content + '\n';
				}
			}
		}
	} catch (error) {
		console.error(error);
	} finally {
		// 無論成功或失敗，最後都清除設置的超時定時器
		clearTimeout(timeout);
	}

	const newAddressesapi = await 整理(newapi);

	// 返回處理後的結果
	return newAddressesapi;
}

async function 整理測速結果(tls) {
	// 參數驗證
	if (!tls) {
		console.error('TLS參數不能為空');
		return [];
	}

	// 檢查CSV地址列表
	if (!Array.isArray(addressescsv) || addressescsv.length === 0) {
		console.warn('沒有可用的CSV地址列表');
		return [];
	}

	// CSV解析函數
	function parseCSV(text) {
		return text
			.replace(/\r\n/g, '\n')   // 統一Windows換行
			.replace(/\r/g, '\n')	 // 處理老Mac換行
			.split('\n')			   // 按Unix/Linux風格分割
			.filter(line => line.trim() !== '')  // 移除空行
			.map(line => line.split(',').map(cell => cell.trim()));
	}

	// 平行處理CSV
	const csvPromises = addressescsv.map(async (csvUrl) => {
		try {
			const response = await fetch(csvUrl);

			if (!response.ok) {
				throw new Error(`HTTP錯誤 ${response.status}: ${response.statusText}`);
			}

			const text = await response.text();
			const rows = parseCSV(text);

			// 解構和驗證CSV頭部
			const [header, ...dataRows] = rows;
			const tlsIndex = header.findIndex(col => col.toUpperCase() === 'TLS');

			if (tlsIndex === -1) {
				throw new Error('CSV文件缺少必需的欄位');
			}

			return dataRows
				.filter(row => {
					const tlsValue = row[tlsIndex].toUpperCase();
					const speed = parseFloat(row[row.length - 1]);
					return tlsValue === tls.toUpperCase() && speed > DLS;
				})
				.map(row => {
					const ipAddress = row[0];
					const port = row[1];
					const dataCenter = row[tlsIndex + remarkIndex];
					const formattedAddress = `${ipAddress}:${port}#${dataCenter}`;

					// 處理代理IP池
					if (csvUrl.includes('proxyip=true') &&
						row[tlsIndex].toUpperCase() === 'TRUE' &&
						!httpsPorts.includes(port)) {
						proxyIPPool.push(`${ipAddress}:${port}`);
					}

					return formattedAddress;
				});
		} catch (error) {
			console.error(`處理CSV ${csvUrl} 時出錯:`, error);
			return [];
		}
	});

	// 使用Promise.all平行處理並展平結果
	const results = await Promise.all(csvPromises);
	return results.flat();
}

async function 整理(內容) {
	// 將製表符、雙引號、單引號和換行符都替換為逗號
	// 然後將連續的多個逗號替換為單個逗號
	var 替換後的內容 = 內容.replace(/[	|"'\r\n]+/g, ',').replace(/,+/g, ',');

	// 刪除開頭和結尾的逗號（如果有的話）
	if (替換後的內容.charAt(0) == ',') 替換後的內容 = 替換後的內容.slice(1);
	if (替換後的內容.charAt(替換後的內容.length - 1) == ',') 替換後的內容 = 替換後的內容.slice(0, 替換後的內容.length - 1);

	// 使用逗號分割字串，得到地址數組
	const 地址數組 = 替換後的內容.split(',');

	return 地址數組;
}

async function sendMessage(type, ip, add_data = "") {
	if (!BotToken || !ChatID) return;

	try {
		let msg = "";
		const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
		if (response.ok) {
			const ipInfo = await response.json();
			msg = `${type}\nIP: ${ip}\n國家: ${ipInfo.country}\n<tg-spoiler>城市: ${ipInfo.city}\n組織: ${ipInfo.org}\nASN: ${ipInfo.as}\n${add_data}`;
		} else {
			msg = `${type}\nIP: ${ip}\n<tg-spoiler>${add_data}`;
		}

		const url = `https://api.telegram.org/bot${BotToken}/sendMessage?chat_id=${ChatID}&parse_mode=HTML&text=${encodeURIComponent(msg)}`;
		return fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;',
				'Accept-Encoding': 'gzip, deflate, br',
				'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
			}
		});
	} catch (error) {
		console.error('Error sending message:', error);
	}
}

async function nginx() {
	const text = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`
	return text;
}

function surge(content, url, path) {
	let 每行內容;
	if (content.includes('\r\n')) {
		每行內容 = content.split('\r\n');
	} else {
		每行內容 = content.split('\n');
	}

	let 輸出內容 = "";
	for (let x of 每行內容) {
		if (x.includes(atob('PSB0cm9qYW4s'))) {
			const host = x.split("sni=")[1].split(",")[0];
			const 備改內容 = `skip-cert-verify=true, tfo=false, udp-relay=false`;
			const 正確內容 = `skip-cert-verify=true, ws=true, ws-path=${path}, ws-headers=Host:"${host}", tfo=false, udp-relay=false`;
			輸出內容 += x.replace(new RegExp(備改內容, 'g'), 正確內容).replace("[", "").replace("]", "") + '\n';
		} else {
			輸出內容 += x + '\n';
		}
	}

	輸出內容 = `#!MANAGED-CONFIG ${url.href} interval=86400 strict=false` + 輸出內容.substring(輸出內容.indexOf('\n'));
	return 輸出內容;
}

function getRandomProxyByMatch(CC, socks5Data) {
	// 將匹配字串轉換為小寫
	const lowerCaseMatch = CC.toLowerCase();

	// 過濾出所有以指定匹配字串結尾的代理字串
	let filteredProxies = socks5Data.filter(proxy => proxy.toLowerCase().endsWith(`#${lowerCaseMatch}`));

	// 如果沒有匹配的代理，嘗試匹配 "US"
	if (filteredProxies.length === 0) {
		filteredProxies = socks5Data.filter(proxy => proxy.toLowerCase().endsWith(`#us`));
	}

	// 如果還是沒有匹配的代理，從整個代理列表中隨機選擇一個
	if (filteredProxies.length === 0) {
		return socks5Data[Math.floor(Math.random() * socks5Data.length)];
	}

	// 從匹配的代理中隨機選擇一個並返回
	const randomProxy = filteredProxies[Math.floor(Math.random() * filteredProxies.length)];
	return randomProxy;
}

async function MD5MD5(text) {
	const encoder = new TextEncoder();

	const firstPass = await crypto.subtle.digest('MD5', encoder.encode(text));
	const firstPassArray = Array.from(new Uint8Array(firstPass));
	const firstHex = firstPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

	const secondPass = await crypto.subtle.digest('MD5', encoder.encode(firstHex.slice(7, 27)));
	const secondPassArray = Array.from(new Uint8Array(secondPass));
	const secondHex = secondPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

	return secondHex.toLowerCase();
}

function revertFakeInfo(content, userID, hostName) {
	content = content.replace(new RegExp(fakeUserID, 'g'), userID).replace(new RegExp(fakeHostName, 'g'), hostName);
	return content;
}

function generateFakeInfo(content, userID, hostName) {
	content = content.replace(new RegExp(userID, 'g'), fakeUserID).replace(new RegExp(hostName, 'g'), fakeHostName);
	return content;
}

function isValidIPv4(address) {
	const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	return ipv4Regex.test(address);
}

function 生成動態UUID(金鑰) {
	const 時區偏移 = 8; // 北京時間相對於UTC的時區偏移+8小時
	const 起始日期 = new Date(2007, 6, 7, 更新時間, 0, 0); // 固定起始日期為2007年7月7日的凌晨3點
	const 一週的毫秒數 = 1000 * 60 * 60 * 24 * 有效時間;

	function 獲取當前週數() {
		const 現在 = new Date();
		const 調整後的現在 = new Date(現在.getTime() + 時區偏移 * 60 * 60 * 1000);
		const 時間差 = Number(調整後的現在) - Number(起始日期);
		return Math.ceil(時間差 / 一週的毫秒數);
	}

	function 生成UUID(基礎字串) {
		const 哈希緩衝區 = new TextEncoder().encode(基礎字串);
		return crypto.subtle.digest('SHA-256', 哈希緩衝區).then((哈希) => {
			const 哈希數組 = Array.from(new Uint8Array(哈希));
			const 十六進制哈希 = 哈希數組.map(b => b.toString(16).padStart(2, '0')).join('');
			return `${十六進制哈希.substr(0, 8)}-${十六進制哈希.substr(8, 4)}-4${十六進制哈希.substr(13, 3)}-${(parseInt(十六進制哈希.substr(16, 2), 16) & 0x3f | 0x80).toString(16)}${十六進制哈希.substr(18, 2)}-${十六進制哈希.substr(20, 12)}`;
		});
	}

	const 當前週數 = 獲取當前週數(); // 獲取當前週數
	const 結束時間 = new Date(起始日期.getTime() + 當前週數 * 一週的毫秒數);

	// 生成兩個 UUID
	const 當前UUIDPromise = 生成UUID(金鑰 + 當前週數);
	const 上一個UUIDPromise = 生成UUID(金鑰 + (當前週數 - 1));

	// 格式化到期時間
	const 到期時間UTC = new Date(結束時間.getTime() - 時區偏移 * 60 * 60 * 1000); // UTC時間
	const 到期時間字串 = `到期時間(UTC): ${到期時間UTC.toISOString().slice(0, 19).replace('T', ' ')} (UTC+8): ${結束時間.toISOString().slice(0, 19).replace('T', ' ')}\n`;

	return Promise.all([當前UUIDPromise, 上一個UUIDPromise, 到期時間字串]);
}

async function getLink(重新匯總所有連結) {
	let 節點LINK = [];
	let 訂閱連結 = [];
	for (let x of 重新匯總所有連結) {
		if (x.toLowerCase().startsWith('http')) {
			訂閱連結.push(x);
		} else {
			節點LINK.push(x);
		}
	}

	if (訂閱連結 && 訂閱連結.length !== 0) {
		function base64Decode(str) {
			const bytes = new Uint8Array(atob(str).split('').map(c => c.charCodeAt(0)));
			const decoder = new TextDecoder('utf-8');
			return decoder.decode(bytes);
		}
		const controller = new AbortController(); // 創建一個AbortController實例，用於取消請求

		const timeout = setTimeout(() => {
			controller.abort(); // 2秒後取消所有請求
		}, 2000);

		try {
			// 使用Promise.allSettled等待所有API請求完成，無論成功或失敗
			const responses = await Promise.allSettled(訂閱連結.map(apiUrl => fetch(apiUrl, {
				method: 'get',
				headers: {
					'Accept': 'text/html,application/xhtml+xml,application/xml;',
					'User-Agent': `\u0076\u0032\u0072\u0061\u0079\u004e\u002f${FileName + atob('IGNtbGl1L1dvcmtlclZsZXNzMnN1Yg==')}`
				},
				signal: controller.signal // 將AbortController的信號量添加到fetch請求中
			}).then(response => response.ok ? response.text() : Promise.reject())));

			// 遍歷所有響應
			const modifiedResponses = responses.map((response, index) => {
				// 檢查是否請求成功
				return {
					status: response.status,
					value: response.status === 'fulfilled' ? response.value : null,
					apiUrl: 訂閱連結[index] // 將原始的apiUrl添加到返回對象中
				};
			});

			console.log(modifiedResponses); // 輸出修改後的響應數組

			for (const response of modifiedResponses) {
				// 檢查響應狀態是否為'fulfilled'
				if (response.status === 'fulfilled') {
					const content = await response.value || 'null'; // 獲取響應的內容
					if (content.includes('://')) {
						const lines = content.includes('\r\n') ? content.split('\r\n') : content.split('\n');
						節點LINK = 節點LINK.concat(lines);
					} else {
						const 嘗試base64解碼內容 = base64Decode(content);
						if (嘗試base64解碼內容.includes('://')) {
							const lines = 嘗試base64解碼內容.includes('\r\n') ? 嘗試base64解碼內容.split('\r\n') : 嘗試base64解碼內容.split('\n');
							節點LINK = 節點LINK.concat(lines);
						}
					}
				}
			}
		} catch (error) {
			console.error(error); // 捕獲並輸出錯誤資訊
		} finally {
			clearTimeout(timeout); // 清除定時器
		}
	}

	return 節點LINK;
}

function utf8ToBase64(str) {
	return btoa(unescape(encodeURIComponent(str)));
}

export default {
	async fetch(request, env) {
		if (env.TOKEN) 快速訂閱訪問入口 = await 整理(env.TOKEN);
		BotToken = env.TGTOKEN || BotToken;
		ChatID = env.TGID || ChatID;
		subConverter = env.SUBAPI || subConverter;
		subConfig = env.SUBCONFIG || subConfig;
		FileName = env.SUBNAME || FileName;
		socks5DataURL = env.SOCKS5DATA || socks5DataURL;
		if (env.CMPROXYIPS) 匹配PROXYIP = await 整理(env.CMPROXYIPS);;
		if (env.CFPORTS) httpsPorts = await 整理(env.CFPORTS);
		EndPS = env.PS || EndPS;
		網站圖示 = env.ICO ? `<link rel="icon" sizes="32x32" href="${env.ICO}">` : '';
		網站頭像 = env.PNG ? `<div class="logo-wrapper"><div class="logo-border"></div><img src="${env.PNG}" alt="Logo"></div>` : '';
		if (env.IMG) {
			const imgs = await 整理(env.IMG);
			網站背景 = `background-image: url('${imgs[Math.floor(Math.random() * imgs.length)]}');`;
		} else 網站背景 = '';
		網路備案 = env.BEIAN || env.BY || 網路備案;
		const userAgentHeader = request.headers.get('User-Agent');
		const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
		const url = new URL(request.url);
		const format = url.searchParams.get('format') ? url.searchParams.get('format').toLowerCase() : "null";
		let host = "";
		let uuid = "";
		let path = "";
		let sni = "";
		let type = "ws";
		alpn = env.ALPN || alpn;
		let UD = Math.floor(((timestamp - Date.now()) / timestamp * 99 * 1099511627776) / 2);
		if (env.UA) MamaJustKilledAMan = MamaJustKilledAMan.concat(await 整理(env.UA));

		const currentDate = new Date();
		const fakeUserIDMD5 = await MD5MD5(Math.ceil(currentDate.getTime()));
		fakeUserID = fakeUserIDMD5.slice(0, 8) + "-" + fakeUserIDMD5.slice(8, 12) + "-" + fakeUserIDMD5.slice(12, 16) + "-" + fakeUserIDMD5.slice(16, 20) + "-" + fakeUserIDMD5.slice(20);
		fakeHostName = fakeUserIDMD5.slice(6, 9) + "." + fakeUserIDMD5.slice(13, 19) + ".xyz";

		total = total * 1099511627776;
		let expire = Math.floor(timestamp / 1000);

		link = env.LINK || link;

		if (env.ADD) addresses = await 整理(env.ADD);
		if (env.ADDAPI) addressesapi = await 整理(env.ADDAPI);
		if (env.ADDNOTLS) addressesnotls = await 整理(env.ADDNOTLS);
		if (env.ADDNOTLSAPI) addressesnotlsapi = await 整理(env.ADDNOTLSAPI);
		if (env.ADDCSV) addressescsv = await 整理(env.ADDCSV);
		DLS = Number(env.DLS) || DLS;
		remarkIndex = Number(env.CSVREMARK) || remarkIndex;

		if (socks5DataURL) {
			try {
				const response = await fetch(socks5DataURL);
				const socks5DataText = await response.text();
				if (socks5DataText.includes('\r\n')) {
					socks5Data = socks5DataText.split('\r\n').filter(line => line.trim() !== '');
				} else {
					socks5Data = socks5DataText.split('\n').filter(line => line.trim() !== '');
				}
			} catch {
				socks5Data = null;
			}
		}

		if (env.PROXYIP) proxyIPs = await 整理(env.PROXYIP);
		//console.log(proxyIPs);

		if (快速訂閱訪問入口.length > 0 && 快速訂閱訪問入口.some(token => url.pathname.includes(token))) {
			host = "null";
			if (env.HOST) {
				const hosts = await 整理(env.HOST);
				host = hosts[Math.floor(Math.random() * hosts.length)];
			}

			if (env.PASSWORD) {
				協議類型 = atob('VHJvamFu');
				uuid = env.PASSWORD
			} else {
				協議類型 = atob(`\u0056\u006b\u0078\u0046\u0055\u0031\u004d\u003d`);
				if (env.KEY) {
					有效時間 = Number(env.TIME) || 有效時間;
					更新時間 = Number(env.UPTIME) || 更新時間;
					const userIDs = await 生成動態UUID(env.KEY);
					uuid = userIDs[0];
				} else {
					uuid = env.UUID || "null";
				}
			}

			path = env.PATH || "/?ed=2560";
			sni = env.SNI || host;
			type = env.TYPE || type;
			隧道版本作者 = env.ED || 隧道版本作者;
			獲取代理IP = env.RPROXYIP || 'false';

			if (host == "null" || uuid == "null") {
				let 空欄位;
				if (host == "null" && uuid == "null") 空欄位 = "HOST/UUID";
				else if (host == "null") 空欄位 = "HOST";
				else if (uuid == "null") 空欄位 = "UUID";
				EndPS += ` 訂閱器內建節點 ${空欄位} 未設置！！！`;
			}

			await sendMessage(`#獲取訂閱 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgentHeader}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
		} else {
			host = url.searchParams.get('host');
			uuid = url.searchParams.get('uuid') || url.searchParams.get('password') || url.searchParams.get('pw');
			path = url.searchParams.get('path');
			sni = url.searchParams.get('sni') || host;
			type = url.searchParams.get('type') || type;
			alpn = url.searchParams.get('alpn') || alpn;
			隧道版本作者 = url.searchParams.get(atob('ZWRnZXR1bm5lbA==')) || url.searchParams.get(atob('ZXBlaXVz')) || 隧道版本作者;
			獲取代理IP = url.searchParams.get('proxyip') || 'false';

			if (url.searchParams.has('alterid')) {
				協議類型 = 'VMess';
				額外ID = url.searchParams.get('alterid') || 額外ID;
				加密方式 = url.searchParams.get('security') || 加密方式;
			} else if (url.searchParams.has(atob('ZWRnZXR1bm5lbA==')) || url.searchParams.has('uuid')) {
				協議類型 = atob('VkxFU1M=');
			} else if (url.searchParams.has(atob('ZXBlaXVz')) || url.searchParams.has('password') || url.searchParams.has('pw')) {
				協議類型 = atob('VHJvamFu');
			}

			if (!url.pathname.includes("/sub")) {
				const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
				if (envKey) {
					const URLs = await 整理(env[envKey]);
					if (URLs.includes('nginx')) {
						return new Response(await nginx(), {
							headers: {
								'Content-Type': 'text/html; charset=UTF-8',
							},
						});
					}
					const URL = URLs[Math.floor(Math.random() * URLs.length)];
					return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request));
				}
				return await subHtml(request);
			}

			if (!host || !uuid) {
				const responseText = `
			缺少必填參數：host 和 uuid
			Missing required parameters: host and uuid
			پارامترهای ضروری وارد نشده: هاست و یوآی‌دی
			
			${url.origin}/sub?host=[your host]&uuid=[your uuid]&path=[your path]
			
			
			
			
			
			
				
				${atob('aHR0cHM6Ly9naXRodWIuY29tL2NtbGl1L3dvcmtlclZsZXNzMnN1Yg==')}
				`;

				return new Response(responseText, {
					status: 202,
					headers: { 'content-type': 'text/plain; charset=utf-8' },
				});
			}

			if (!path || path.trim() === '') {
				path = '/?ed=2560';
			} else {
				// 如果第一個字元不是斜槓，則在前面添加一個斜槓
				path = (path[0] === '/') ? path : '/' + path;
			}
		}

		if (host.toLowerCase().includes('notls') || host.toLowerCase().includes('worker') || host.toLowerCase().includes('trycloudflare')) noTLS = 'true';
		noTLS = env.NOTLS || noTLS;
		let subConverterUrl = generateFakeInfo(url.href, uuid, host);
		if (userAgent.includes('subconverter')) alpn = '';
		if (!userAgent.includes('subconverter') && MamaJustKilledAMan.some(PutAGunAgainstHisHeadPulledMyTriggerNowHesDead => userAgent.includes(PutAGunAgainstHisHeadPulledMyTriggerNowHesDead)) && MamaJustKilledAMan.length > 0) {
			const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
			if (envKey) {
				const URLs = await 整理(env[envKey]);
				if (URLs.includes('nginx')) {
					return new Response(await nginx(), {
						headers: {
							'Content-Type': 'text/html; charset=UTF-8',
						},
					});
				}
				const URL = URLs[Math.floor(Math.random() * URLs.length)];
				return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request));
			}
			return await subHtml(request);
		} else if ((userAgent.includes('clash') || (format === 'clash' && !userAgent.includes('subconverter'))) && !userAgent.includes('nekobox') && !userAgent.includes('cf-workers-sub')) {
			subConverterUrl = `https://${subConverter}/sub?target=clash&url=${encodeURIComponent(subConverterUrl)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
		} else if ((userAgent.includes('sing-box') || userAgent.includes('singbox') || (format === 'singbox' && !userAgent.includes('subconverter'))) && !userAgent.includes('cf-workers-sub')) {
			if (協議類型 == 'VMess' && url.href.includes('path=')) {
				const 路徑參數前部分 = url.href.split('path=')[0];
				const parts = url.href.split('path=')[1].split('&');
				const 路徑參數後部分 = parts.slice(1).join('&') || '';
				const 待處理路徑參數 = url.href.split('path=')[1].split('&')[0] || '';
				if (待處理路徑參數.includes('%3F')) subConverterUrl = generateFakeInfo(路徑參數前部分 + 'path=' + 待處理路徑參數.split('%3F')[0] + '&' + 路徑參數後部分, uuid, host);
			}
			subConverterUrl = `https://${subConverter}/sub?target=singbox&url=${encodeURIComponent(subConverterUrl)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
		} else {
			if (host.includes('workers.dev')) {
				if (臨時中轉域名介面) {
					try {
						const response = await fetch(臨時中轉域名介面);

						if (!response.ok) {
							console.error('獲取地址時出錯:', response.status, response.statusText);
							return; // 如果有錯誤，直接返回
						}

						const text = await response.text();
						const lines = text.split('\n');
						// 過濾掉空行或只包含空白字元的行
						const nonEmptyLines = lines.filter(line => line.trim() !== '');

						臨時中轉域名 = 臨時中轉域名.concat(nonEmptyLines);
					} catch (error) {
						console.error('獲取地址時出錯:', error);
					}
				}
				// 使用Set對象去重
				臨時中轉域名 = [...new Set(臨時中轉域名)];
			}

			const newAddressesapi = await 整理優選列表(addressesapi);
			const newAddressescsv = await 整理測速結果('TRUE');
			const uniqueAddresses = Array.from(new Set(addresses.concat(newAddressesapi, newAddressescsv).filter(item => item && item.trim())));

			let notlsresponseBody;
			if ((noTLS == 'true' && 協議類型 == atob(`\u0056\u006b\u0078\u0046\u0055\u0031\u004d\u003d`)) || 協議類型 == 'VMess') {
				const newAddressesnotlsapi = await 整理優選列表(addressesnotlsapi);
				const newAddressesnotlscsv = await 整理測速結果('FALSE');
				const uniqueAddressesnotls = Array.from(new Set(addressesnotls.concat(newAddressesnotlsapi, newAddressesnotlscsv).filter(item => item && item.trim())));

				notlsresponseBody = uniqueAddressesnotls.map(address => {
					let port = "-1";
					let addressid = address;

					const match = addressid.match(regex);
					if (!match) {
						if (address.includes(':') && address.includes('#')) {
							const parts = address.split(':');
							address = parts[0];
							const subParts = parts[1].split('#');
							port = subParts[0];
							addressid = subParts[1];
						} else if (address.includes(':')) {
							const parts = address.split(':');
							address = parts[0];
							port = parts[1];
						} else if (address.includes('#')) {
							const parts = address.split('#');
							address = parts[0];
							addressid = parts[1];
						}

						if (addressid.includes(':')) {
							addressid = addressid.split(':')[0];
						}
					} else {
						address = match[1];
						port = match[2] || port;
						addressid = match[3] || address;
					}

					const httpPorts = ["8080", "8880", "2052", "2082", "2086", "2095"];
					if (!isValidIPv4(address) && port == "-1") {
						for (let httpPort of httpPorts) {
							if (address.includes(httpPort)) {
								port = httpPort;
								break;
							}
						}
					}
					if (port == "-1") port = "80";
					//console.log(address, port, addressid);

					if (隧道版本作者.trim() === atob('Y21saXU=') && 獲取代理IP.trim() === 'true') {
						// 將addressid轉換為小寫
						let lowerAddressid = addressid.toLowerCase();
						// 初始化找到的proxyIP為null
						let foundProxyIP = null;

						if (socks5Data) {
							const socks5 = getRandomProxyByMatch(lowerAddressid, socks5Data);
							path = `/${socks5}`;
						} else {
							// 遍歷匹配PROXYIP數組尋找匹配項
							for (let item of 匹配PROXYIP) {
								if (item.includes('#') && item.split('#')[1] && lowerAddressid.includes(item.split('#')[1].toLowerCase())) {
									foundProxyIP = item.split('#')[0];
									break; // 找到匹配項，跳出循環
								} else if (item.includes(':') && item.split(':')[1] && lowerAddressid.includes(item.split(':')[1].toLowerCase())) {
									foundProxyIP = item.split(':')[0];
									break; // 找到匹配項，跳出循環
								}
							}

							if (foundProxyIP) {
								// 如果找到匹配的proxyIP，賦值給path
								path = atob('Lz9lZD0yNTYwJnByb3h5aXA9') + foundProxyIP;
							} else {
								// 如果沒有找到匹配項，隨機選擇一個proxyIP
								const randomProxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
								path = atob('Lz9lZD0yNTYwJnByb3h5aXA9') + randomProxyIP;
							}
						}
					}

					if (協議類型 == 'VMess') {
						const vmessLink = `vmess://${utf8ToBase64(`{"v":"2","ps":"${addressid + EndPS}","add":"${address}","port":"${port}","id":"${uuid}","aid":"${額外ID}","scy":"${加密方式}","net":"ws","type":"${type}","host":"${host}","path":"${path}","tls":"","sni":"","alpn":"${encodeURIComponent(alpn)}","fp":""}`)}`;
						return vmessLink;
					} else {
						const 維列斯Link = `${atob('dmxlc3M6Ly8=') + uuid}@${address}:${port + atob('P2VuY3J5cHRpb249bm9uZSZzZWN1cml0eT0mdHlwZT0=') + type}&host=${host}&path=${encodeURIComponent(path)}#${encodeURIComponent(addressid + EndPS)}`;
						return 維列斯Link;
					}

				}).join('\n');
			}

			const responseBody = uniqueAddresses.map(address => {
				let port = "-1";
				let addressid = address;

				const match = addressid.match(regex);
				if (!match) {
					if (address.includes(':') && address.includes('#')) {
						const parts = address.split(':');
						address = parts[0];
						const subParts = parts[1].split('#');
						port = subParts[0];
						addressid = subParts[1];
					} else if (address.includes(':')) {
						const parts = address.split(':');
						address = parts[0];
						port = parts[1];
					} else if (address.includes('#')) {
						const parts = address.split('#');
						address = parts[0];
						addressid = parts[1];
					}

					if (addressid.includes(':')) {
						addressid = addressid.split(':')[0];
					}
				} else {
					address = match[1];
					port = match[2] || port;
					addressid = match[3] || address;
				}

				if (!isValidIPv4(address) && port == "-1") {
					for (let httpsPort of httpsPorts) {
						if (address.includes(httpsPort)) {
							port = httpsPort;
							break;
						}
					}
				}
				if (port == "-1") port = "443";

				//console.log(address, port, addressid);

				if (隧道版本作者.trim() === atob('Y21saXU=') && 獲取代理IP.trim() === 'true') {
					// 將addressid轉換為小寫
					let lowerAddressid = addressid.toLowerCase();
					// 初始化找到的proxyIP為null
					let foundProxyIP = null;

					if (socks5Data) {
						const socks5 = getRandomProxyByMatch(lowerAddressid, socks5Data);
						path = `/${socks5}`;
					} else {
						// 遍歷匹配PROXYIP數組尋找匹配項
						for (let item of 匹配PROXYIP) {
							if (item.includes('#') && item.split('#')[1] && lowerAddressid.includes(item.split('#')[1].toLowerCase())) {
								foundProxyIP = item.split('#')[0];
								break; // 找到匹配項，跳出循環
							} else if (item.includes(':') && item.split(':')[1] && lowerAddressid.includes(item.split(':')[1].toLowerCase())) {
								foundProxyIP = item.split(':')[0];
								break; // 找到匹配項，跳出循環
							}
						}

						const matchingProxyIP = proxyIPPool.find(proxyIP => proxyIP.includes(address));
						if (matchingProxyIP) {
							path = atob('Lz9lZD0yNTYwJnByb3h5aXA9') + matchingProxyIP;
						} else if (foundProxyIP) {
							// 如果找到匹配的proxyIP，賦值給path
							path = atob('Lz9lZD0yNTYwJnByb3h5aXA9') + foundProxyIP;
						} else {
							// 如果沒有找到匹配項，隨機選擇一個proxyIP
							const randomProxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
							path = atob('Lz9lZD0yNTYwJnByb3h5aXA9') + randomProxyIP;
						}
					}
				}

				let 偽裝域名 = host;
				let 最終路徑 = path;
				let 節點備註 = EndPS;
				if (臨時中轉域名.length > 0 && (host.includes('.workers.dev'))) {
					最終路徑 = `/${host}${path}`;
					偽裝域名 = 臨時中轉域名[Math.floor(Math.random() * 臨時中轉域名.length)];
					節點備註 = EndPS + atob('IOW3suWQr+eUqOS4tOaXtuWfn+WQjeS4rei9rOacjeWKoe+8jOivt+WwveW/q+e7keWumuiHquWumuS5ieWfn++8gQ==');
					sni = 偽裝域名;
				}

				if (協議類型 == 'VMess') {
					const vmessLink = `vmess://${utf8ToBase64(`{"v":"2","ps":"${addressid + 節點備註}","add":"${address}","port":"${port}","id":"${uuid}","aid":"${額外ID}","scy":"${加密方式}","net":"ws","type":"${type}","host":"${偽裝域名}","path":"${最終路徑}","tls":"tls","sni":"${sni}","alpn":"${encodeURIComponent(alpn)}","fp":""}`)}`;
					return vmessLink;
				} else if (協議類型 == atob('VHJvamFu')) {
					const 特洛伊Link = `${atob('dHJvamFuOi8v') + uuid}@${address}:${port + atob('P3NlY3VyaXR5PXRscyZzbmk9') + sni}&alpn=${encodeURIComponent(alpn)}&fp=randomized&type=${type}&host=${偽裝域名}&path=${encodeURIComponent(最終路徑)}#${encodeURIComponent(addressid + 節點備註)}`;
					return 特洛伊Link;
				} else {
					const 維列斯Link = `${atob('dmxlc3M6Ly8=') + uuid}@${address}:${port + atob('P2VuY3J5cHRpb249bm9uZSZzZWN1cml0eT10bHMmc25pPQ==') + sni}&alpn=${encodeURIComponent(alpn)}&fp=random&type=${type}&host=${偽裝域名}&path=${encodeURIComponent(最終路徑)}#${encodeURIComponent(addressid + 節點備註)}`;
					return 維列斯Link;
				}

			}).join('\n');

			let combinedContent = responseBody; // 合併內容

			if (link) {
				const links = await 整理(link);
				const 整理節點LINK = (await getLink(links)).join('\n');
				combinedContent += '\n' + 整理節點LINK;
				console.log("link: " + 整理節點LINK)
			}

			if (notlsresponseBody && noTLS == 'true') {
				combinedContent += '\n' + notlsresponseBody;
				console.log("notlsresponseBody: " + notlsresponseBody);
			}

			if (協議類型 == atob('VHJvamFu') && (userAgent.includes('surge') || (format === 'surge' && !userAgent.includes('subconverter'))) && !userAgent.includes('cf-workers-sub')) {
				const 特洛伊Links = combinedContent.split('\n');
				const 特洛伊LinksJ8 = generateFakeInfo(特洛伊Links.join('|'), uuid, host);
				subConverterUrl = `https://${subConverter}/sub?target=surge&ver=4&url=${encodeURIComponent(特洛伊LinksJ8)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&xudp=false&udp=false&tfo=false&expand=true&scv=true&fdn=false`;
			} else {

				let base64Response;
				try {
					base64Response = btoa(combinedContent); // 重新進行 Base64 編碼
				} catch (e) {
					function encodeBase64(data) {
						const binary = new TextEncoder().encode(data);
						let base64 = '';
						const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

						for (let i = 0; i < binary.length; i += 3) {
							const byte1 = binary[i];
							const byte2 = binary[i + 1] || 0;
							const byte3 = binary[i + 2] || 0;

							base64 += chars[byte1 >> 2];
							base64 += chars[((byte1 & 3) << 4) | (byte2 >> 4)];
							base64 += chars[((byte2 & 15) << 2) | (byte3 >> 6)];
							base64 += chars[byte3 & 63];
						}

						const padding = 3 - (binary.length % 3 || 3);
						return base64.slice(0, base64.length - padding) + '=='.slice(0, padding);
					}

					base64Response = encodeBase64(combinedContent);
				}

				const response = new Response(base64Response, {
					headers: {
						//"Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						//"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
					},
				});

				return response;
			}

		}

		try {
			const subConverterResponse = await fetch(subConverterUrl);

			if (!subConverterResponse.ok) {
				throw new Error(`Error fetching subConverterUrl: ${subConverterResponse.status} ${subConverterResponse.statusText}`);
			}

			let subConverterContent = await subConverterResponse.text();

			if (協議類型 == atob('VHJvamFu') && (userAgent.includes('surge') || (format === 'surge' && !userAgent.includes('subconverter'))) && !userAgent.includes('cf-workers-sub')) {
				subConverterContent = surge(subConverterContent, host, path);
			}
			subConverterContent = revertFakeInfo(subConverterContent, uuid, host);
			return new Response(subConverterContent, {
				headers: {
					"Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
					"content-type": "text/plain; charset=utf-8",
					"Profile-Update-Interval": `${SUBUpdateTime}`,
					//"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
				},
			});
		} catch (error) {
			return new Response(`Error: ${error.message}`, {
				status: 500,
				headers: { 'content-type': 'text/plain; charset=utf-8' },
			});
		}
	}
};

async function subHtml(request) {
	const url = new URL(request.url);
	const HTML = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${FileName}</title>
				${網站圖示}
				<style>
					:root {
						--primary-color: #4361ee;
						--hover-color: #3b4fd3;
						--bg-color: #f5f6fa;
						--card-bg: #ffffff;
					}
					
					* {
						box-sizing: border-box;
						margin: 0;
						padding: 0;
					}
					
					body {
						${網站背景}
						background-size: cover;
						background-position: center;
						background-attachment: fixed;
						background-color: var(--bg-color);
						font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
						line-height: 1.6;
						color: #333;
						min-height: 100vh;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					
					.container {
						position: relative;
						/* 使用rgba設置半透明背景 */
						background: rgba(255, 255, 255, 0.7);
						/* 添加磨砂玻璃效果 */
						backdrop-filter: blur(10px);
						-webkit-backdrop-filter: blur(10px); /* Safari相容 */
						max-width: 600px;
						width: 90%;
						padding: 2rem;
						border-radius: 20px;
						/* 調整陰影效果增加通透感 */
						box-shadow: 0 10px 20px rgba(0,0,0,0.05),
									inset 0 0 0 1px rgba(255, 255, 255, 0.1);
						transition: transform 0.3s ease;
					}

					/* 調整hover效果 */
					.container:hover {
						transform: translateY(-5px);
						box-shadow: 0 15px 30px rgba(0,0,0,0.1),
									inset 0 0 0 1px rgba(255, 255, 255, 0.2);
					}
					
					h1 {
						text-align: center;
						color: var(--primary-color);
						margin-bottom: 2rem;
						font-size: 1.8rem;
					}
					
					.input-group {
						margin-bottom: 1.5rem;
					}
					
					label {
						display: block;
						margin-bottom: 0.5rem;
						color: #555;
						font-weight: 500;
					}
					
					input {
						width: 100%;
						padding: 12px;
						/* 修改邊框顏色從 #eee 到更深的顏色 */
						border: 2px solid rgba(0, 0, 0, 0.15);  /* 使用rgba實現更自然的深度 */
						border-radius: 10px;
						font-size: 1rem;
						transition: all 0.3s ease;
						/* 添加輕微的內陰影增強邊框效果 */
						box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
					}

					input:focus {
						outline: none;
						border-color: var(--primary-color);
						/* 增強focus狀態下的陰影效果 */
						box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15),
									inset 0 2px 4px rgba(0, 0, 0, 0.03);
					}
					
					button {
						width: 100%;
						padding: 12px;
						background-color: var(--primary-color);
						color: white;
						border: none;
						border-radius: 10px;
						font-size: 1rem;
						font-weight: 600;
						cursor: pointer;
						transition: all 0.3s ease;
						margin-bottom: 1.5rem;
					}
					
					button:hover {
						background-color: var(--hover-color);
						transform: translateY(-2px);
					}
					
					button:active {
						transform: translateY(0);
					}
					
					#result {
						background-color: #f8f9fa;
						font-family: monospace;
						word-break: break-all;
					}

					.github-corner svg {
						fill: var(--primary-color);
						color: var(--card-bg);
						position: absolute;
						top: 0;
						right: 0;
						border: 0;
						width: 80px;
						height: 80px;
					}

					.github-corner:hover .octo-arm {
						animation: octocat-wave 560ms ease-in-out;
					}

					@keyframes octocat-wave {
						0%, 100% { transform: rotate(0) }
						20%, 60% { transform: rotate(-25deg) }
						40%, 80% { transform: rotate(10deg) }
					}

					@keyframes rotate {
						from { transform: rotate(0deg); }
						to { transform: rotate(360deg); }
					}

					.logo-title {
						position: relative;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-bottom: 2rem;
					}

					.logo-wrapper {
						position: absolute;
						left: 0;
						width: 50px;
						height: 50px;
					}

					.logo-title img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						position: relative;
						z-index: 1;
						background: var(--card-bg);
						box-shadow: 0 0 15px rgba(67, 97, 238, 0.1);
					}

					.logo-border {
						position: absolute;
						/* 擴大邊框範圍以確保完全覆蓋 */
						top: -3px;
						left: -3px;
						right: -3px;
						bottom: -3px;
						border-radius: 50%;
						animation: rotate 3s linear infinite;
						background: conic-gradient(
							from 0deg,
							transparent 0%,
							var(--primary-color) 20%,
							rgba(67, 97, 238, 0.8) 40%,
							transparent 60%,
							transparent 100%
						);
						box-shadow: 0 0 10px rgba(67, 97, 238, 0.3);
						filter: blur(0.5px);
					}

					.logo-border::after {
						content: '';
						position: absolute;
						/* 調整內圓遮罩的大小 */
						inset: 3px;
						border-radius: 50%;
						background: var(--card-bg);
					}

					@keyframes rotate {
						from { transform: rotate(0deg); }
						to { transform: rotate(360deg); }
					}

					.logo-title h1 {
						margin-bottom: 0;
						text-align: center;
					}

					@media (max-width: 480px) {
						.container {
							padding: 1.5rem;
						}
						
						h1 {
							font-size: 1.5rem;
						}

						.github-corner:hover .octo-arm {
							animation: none;
						}
						.github-corner .octo-arm {
							animation: octocat-wave 560ms ease-in-out;
						}

						.logo-wrapper {
							width: 40px;
							height: 40px;
						}
					}

					.beian-info {
						text-align: center;
						font-size: 13px;
					}

					.beian-info a {
						color: var(--primary-color);
						text-decoration: none;
						border-bottom: 1px dashed var(--primary-color);
						padding-bottom: 2px;
					}

					.beian-info a:hover {
						border-bottom-style: solid;
					}

					#qrcode {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 20px;
					}

					.info-icon {
						display: inline-flex;
						align-items: center;
						justify-content: center;
						width: 18px;
						height: 18px;
						border-radius: 50%;
						background-color: var(--primary-color);
						color: white;
						font-size: 12px;
						margin-left: 8px;
						cursor: pointer;
						font-weight: bold;
						position: relative;   /* 添加相對定位 */
						top: -3px;            /* 微調垂直位置 */
					}

					.info-tooltip {
						display: none;
						position: fixed; /* 改為固定定位 */
						background: white;
						border: 1px solid var(--primary-color);
						border-radius: 8px;
						padding: 15px;
						z-index: 1000;
						box-shadow: 0 2px 10px rgba(0,0,0,0.1);
						min-width: 200px;
						max-width: 90vw;  /* 視窗寬度的90% */
						width: max-content;  /* 根據內容自適應寬度 */
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%); /* 居中定位 */
						margin: 0;
						line-height: 1.6;
						font-size: 13px;
						white-space: normal;
						word-wrap: break-word;
						overflow-wrap: break-word;
					}

					/* 移除原來的箭頭 */
					.info-tooltip::before {
						display: none;
					}
				</style>
				<script src="https://cdn.jsdelivr.net/npm/@keeex/qrcodejs-kx@1.0.2/qrcode.min.js"></script>
			</head>
			<body>
				<a href="${atob('aHR0cHM6Ly9naXRodWIuY29tL2NtbGl1L1dvcmtlclZsZXNzMnN1Yg==')}" target="_blank" class="github-corner" aria-label="View source on Github">
					<svg viewBox="0 0 250 250" aria-hidden="true">
						<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
						<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
						<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
					</svg>
				</a>
				<div class="container">
						<div class="logo-title">
							${網站頭像}
							<h1>${FileName}</h1>
						</div>
					<div class="input-group">
						<label for="link">節點連結</label>
						<input type="text" id="link" placeholder="${decodeURIComponent(atob('JUU4JUFGJUI3JUU4JUJFJTkzJUU1JTg1JUE1JTIwVk1lc3MlMjAlMkYlMjBWTEVTUyUyMCUyRiUyMFRyb2phbiUyMCVFOSU5MyVCRSVFNiU4RSVBNQ=='))}">
					</div>
					
					<button onclick="generateLink()">生成優選訂閱</button>
					
					<div class="input-group">
						<div style="display: flex; align-items: center;">
							<label for="result">優選訂閱</label>
							<div style="position: relative;">
								<span class="info-icon" onclick="toggleTooltip(event)">!</span>
								<div class="info-tooltip" id="infoTooltip">
									<strong>安全提示</strong>：使用優選訂閱生成器時，需要您提交 <strong>節點配置資訊</strong> 用於生成優選訂閱連結。這意味著訂閱器的維護者可能會獲取到該節點資訊。<strong>請自行斟酌使用風險。</strong><br>
									<br>
									訂閱轉換後端：<strong>${subConverter}</strong><br>
									訂閱轉換設定檔：<strong>${subConfig}</strong>
								</div>
							</div>
						</div>
						<input type="text" id="result" readonly onclick="copyToClipboard()">
						<label id="qrcode" style="margin: 15px 10px -15px 10px;"></label>
					</div>
					<div class="beian-info" style="text-align: center; font-size: 13px;">${網路備案}</div>
				</div>
	
				<script>
					function toggleTooltip(event) {
						event.stopPropagation(); // 阻止事件冒泡
						const tooltip = document.getElementById('infoTooltip');
						tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
					}
					
					// 點擊頁面其他區域關閉提示框
					document.addEventListener('click', function(event) {
						const tooltip = document.getElementById('infoTooltip');
						const infoIcon = document.querySelector('.info-icon');
						
						if (!tooltip.contains(event.target) && !infoIcon.contains(event.target)) {
							tooltip.style.display = 'none';
						}
					});

					function copyToClipboard() {
						const resultInput = document.getElementById('result');
						if (!resultInput.value) {
							return;
						}
						
						resultInput.select();
						navigator.clipboard.writeText(resultInput.value).then(() => {
							const tooltip = document.createElement('div');
							tooltip.style.position = 'fixed';
							tooltip.style.left = '50%';
							tooltip.style.top = '20px';
							tooltip.style.transform = 'translateX(-50%)';
							tooltip.style.padding = '8px 16px';
							tooltip.style.background = '#4361ee';
							tooltip.style.color = 'white';
							tooltip.style.borderRadius = '4px';
							tooltip.style.zIndex = '1000';
							tooltip.textContent = '已複製到剪貼簿';
							
							document.body.appendChild(tooltip);
							
							setTimeout(() => {
								document.body.removeChild(tooltip);
							}, 2000);
						}).catch(err => {
							alert('複製失敗，請手動複製');
						});
					}
	
					function generateLink() {
						const link = document.getElementById('link').value;
						if (!link) {
							alert('請輸入節點連結');
							return;
						}
						
						let uuidType = 'uuid';
						const isTrojan = link.startsWith(\`\${atob('dHJvamFuOi8v')}\`);
						if (isTrojan) uuidType = 'password';
						let subLink = '';
						try {
							const isVMess = link.startsWith('vmess://');
							if (isVMess){
								const vmessLink = link.split('vmess://')[1];
								const vmessJson = JSON.parse(atob(vmessLink));
								
								const host = vmessJson.host;
								const uuid = vmessJson.id;
								const path = vmessJson.path || '/';
								const sni = vmessJson.sni || host;
								const type = vmessJson.type || 'none';
								const alpn = vmessJson.alpn || '';
								const alterId = vmessJson.aid || 0;
								const security = vmessJson.scy || 'auto';
								const domain = window.location.hostname;
								
								subLink = \`https://\${domain}/sub?host=\${host}&uuid=\${uuid}&path=\${encodeURIComponent(path)}&sni=\${sni}&type=\${type}&alpn=\${encodeURIComponent(alpn)}&alterid=\${alterId}&security=\${security}\`;
							} else {
								const uuid = link.split("//")[1].split("@")[0];
								const search = link.split("?")[1].split("#")[0];
								const domain = window.location.hostname;
								
								subLink = \`https://\${domain}/sub?\${uuidType}=\${uuid}&\${search}\`;
							}
							document.getElementById('result').value = subLink;
	
							// 更新二維碼
							const qrcodeDiv = document.getElementById('qrcode');
							qrcodeDiv.innerHTML = '';
							new QRCode(qrcodeDiv, {
								text: subLink,
								width: 220, // 調整寬度
								height: 220, // 調整高度
								colorDark: "#4a60ea", // 二維碼顏色
								colorLight: "#ffffff", // 背景顏色
								correctLevel: QRCode.CorrectLevel.L, // 設置糾錯級別
								scale: 1 // 調整像素顆粒度
							});
						} catch (error) {
							alert('連結格式錯誤，請檢查輸入');
						}
					}
				</script>
			</body>
			</html>
			`;

	return new Response(HTML, {
		headers: {
			"content-type": "text/html;charset=UTF-8",
		},
	});
}
