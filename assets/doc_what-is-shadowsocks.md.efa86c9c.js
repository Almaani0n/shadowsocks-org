import{_ as e,c as a,o as s,R as t}from"./chunks/framework.bdd825cc.js";const m=JSON.parse('{"title":"What is Shadowsocks?","description":"","frontmatter":{},"headers":[],"relativePath":"doc/what-is-shadowsocks.md","filePath":"doc/what-is-shadowsocks.md","lastUpdated":1706429144000}'),o={name:"doc/what-is-shadowsocks.md"},n=t('<h1 id="what-is-shadowsocks" tabindex="-1">What is Shadowsocks? <a class="header-anchor" href="#what-is-shadowsocks" aria-label="Permalink to &quot;What is Shadowsocks?&quot;">​</a></h1><p>Shadowsocks is a secure split proxy loosely based on <a href="https://tools.ietf.org/html/rfc1928" target="_blank" rel="noreferrer">SOCKS5</a>.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">client &lt;---&gt; ss-local &lt;--[encrypted]--&gt; ss-remote &lt;---&gt; target</span></span></code></pre></div><p>The Shadowsocks local component (ss-local) acts like a traditional SOCKS5 server and provides proxy service to clients. It encrypts and forwards data streams and packets from the client to the Shadowsocks remote component (ss-remote), which decrypts and forwards to the target. Replies from target are similarly encrypted and relayed by ss-remote back to ss-local, which decrypts and eventually returns to the original client.</p><h2 id="addressing" tabindex="-1">Addressing <a class="header-anchor" href="#addressing" aria-label="Permalink to &quot;Addressing&quot;">​</a></h2><p>Addresses used in Shadowsocks follow the <a href="https://tools.ietf.org/html/rfc1928#section-5" target="_blank" rel="noreferrer">SOCKS5 address format</a>:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">[1-byte type][variable-length host][2-byte port]</span></span></code></pre></div><p>The following address types are defined:</p><ul><li><code>0x01</code>: host is a 4-byte IPv4 address.</li><li><code>0x03</code>: host is a variable length string, starting with a 1-byte length, followed by up to 255-byte domain name.</li><li><code>0x04</code>: host is a 16-byte IPv6 address.</li></ul><p>The port number is a 2-byte big-endian unsigned integer.</p><h2 id="tcp" tabindex="-1">TCP <a class="header-anchor" href="#tcp" aria-label="Permalink to &quot;TCP&quot;">​</a></h2><p>ss-local initiates a TCP connection to ss-remote by sending an encrypted data stream starting with the target address followed by payload data. The exact encryption scheme differs depending on the cipher used.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">[target address][payload]</span></span></code></pre></div><p>ss-remote receives the encrypted data stream, decrypts and parses the leading target address. It then establishes a new TCP connection to the target and forwards payload data to it. ss-remote receives reply from the target, encrypts and forwards it back to the ss-local, until ss-local disconnects.</p><p>For better obfuscation purposes, both local and remote SHOULD send the handshake data along with some payload in the first packet.</p><h2 id="udp" tabindex="-1">UDP <a class="header-anchor" href="#udp" aria-label="Permalink to &quot;UDP&quot;">​</a></h2><p>ss-local sends an encrypted data packet containing the target address and payload to ss-remote.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">[target address][payload]</span></span></code></pre></div><p>Upon receiving the encrypted packet, ss-remote decrypts and parses the target address. It then sends a new data packet containing only the payload to the target. ss-remote receives data packets back from target and prepends the target address to the payload in each packet, then sends encrypted copies back to ss-local.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">[target address][payload]</span></span></code></pre></div><p>Essentially, ss-remote is performing Network Address Translation for ss-local.</p>',21),r=[n];function d(l,c,i,p,h,g){return s(),a("div",null,r)}const b=e(o,[["render",d]]);export{m as __pageData,b as default};
