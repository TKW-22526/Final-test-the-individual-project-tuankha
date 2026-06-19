// Chill Coffee - product data and client behaviors
(function(){
	const products = [
		{id:1,name:'Espresso',price:25000,short:'Đậm đà, nguyên bản',desc:'Cà phê espresso đậm vị, pha theo tiêu chuẩn barista.', image:'assets/Espresso.jpg'},
		{id:2,name:'Americano',price:30000,short:'Đậm nhẹ, pha nóng',desc:'Espresso pha loãng với nước nóng, phù hợp mọi lúc.', image:'assets/Americano.jpg'},
		{id:3,name:'Latte',price:45000,short:'Sữa mịn, mềm',desc:'Cà phê với sữa tươi đánh bọt mịn, hương vị cân bằng.', image:'assets/Latte.jpg'},
		{id:4,name:'Cappuccino',price:45000,short:'Bọt sữa dày',desc:'Tầng bọt sữa dày cùng espresso hòa quyện.', image:'assets/Cappuccino.jpg'},
		{id:5,name:'Cold Brew',price:55000,short:'Cà phê ủ lạnh',desc:'Cà phê ủ lạnh 12 giờ, mùi vị êm, ít vị chua.', image:'assets/Cold.jpg'},
		{id:6,name:'Trà sữa',price:40000,short:'Trà sữa thơm béo',desc:'Trà sữa pha theo tỉ lệ chuẩn, vị ngọt nhẹ.', image:'assets/Trasua.jpg'},
		{id:7,name:'Smoothie trái cây',price:60000,short:'Tươi mát, bổ dưỡng',desc:'Sinh tố trái cây theo mùa, giàu vị và dinh dưỡng.', image:'assets/Smoothie.jpg'},
		{id:8,name:'Mocha',price:48000,short:'Cacao + cà phê',desc:'Cà phê espresso kết hợp cacao và sữa tươi, vị ngọt dịu.', image:'assets/Mocha.jpg'},
		{id:9,name:'Matcha Latte',price:52000,short:'Matcha nguyên chất',desc:'Bột matcha Nhật hòa cùng sữa tươi, thơm và béo nhẹ.', image:'assets/Matcha.jpg'},
		{id:10,name:'Trà chanh đá',price:30000,short:'Giải khát, tươi mát',desc:'Trà chanh tươi pha lạnh, vị chua ngọt cân bằng, giải nhiệt.', image:'assets/chanhda.jpg'},
		{id:11,name:'Chocolate Frappe',price:60000,short:'Mát lạnh, đậm vị',desc:'Sinh tố cacao đá xay, topping kem tươi.', image:'assets/ChocolateFrappe.jpg'},
		{id:12,name:'Caramel Macchiato',price:55000,short:'Caramel thơm béo',desc:'Espresso kết hợp sữa và caramel ngọt dịu.', image:'assets/CaramelMacchiato.jpg'}
	];

	function formatPrice(n){
		return n.toLocaleString('vi-VN') + ' ₫';
	}

	function resolveImagePath(image){
		if(!image) return '';
		return location.pathname.includes('/html/') ? '../' + image : image;
	}

	// Cart helpers
	function getCart(){
		try{ return JSON.parse(localStorage.getItem('chill_cart')||'{}'); }catch(e){return{}}
	}
	function setCart(cart){ localStorage.setItem('chill_cart',JSON.stringify(cart)); updateCartCount(); }
	function addToCart(id,qty=1){
		const cart=getCart(); cart[id]= (cart[id]||0)+qty; setCart(cart);
		alert('Đã thêm vào giỏ hàng');
	}
	function updateCartCount(){
		const cart=getCart(); const count=Object.values(cart).reduce((s,v)=>s+v,0);
		const el=document.getElementById('cart-count'); if(el) el.textContent=count;
	}

	// Render product list on san-pham.html
	function renderProducts(){
		const el=document.getElementById('products'); if(!el) return;
		el.innerHTML = products.map(p=>{
			const imagePath = resolveImagePath(p.image);
			return `
				<article class="product-card">
					${imagePath ? `<img src="${imagePath}" alt="${p.name}" class="product-image">` : `<div style="height:120px;background:#f5f0ef;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#8b6b6b">Hình ảnh</div>`}
					<div class="title">${p.name}</div>
					<div class="muted">${p.short}</div>
					<div class="price">${formatPrice(p.price)}</div>
					<div style="margin-top:auto;display:flex;gap:8px">
						<a class="btn" href="chi-tiet.html?id=${p.id}">Chi tiết</a>
						<button class="btn secondary" onclick="addToCart(${p.id})">Thêm</button>
					</div>
				</article>
			`;
		}).join('');
	}

		// Render featured products on homepage (first 4)
		function renderFeatured(){
			const el=document.getElementById('featured-products'); if(!el) return;
			const items = products.slice(0,4);
			el.innerHTML = items.map(p=>{
			const imagePath = resolveImagePath(p.image);
			return `
				<article class="product-card">
					${imagePath ? `<img src="${imagePath}" alt="${p.name}" class="product-image">` : `<div style="height:100px;background:#f5f0ef;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#8b6b6b">Ảnh</div>`}
						<div class="title">${p.name}</div>
						<div class="muted">${p.short}</div>
						<div class="price">${formatPrice(p.price)}</div>
						<div style="margin-top:auto;display:flex;gap:8px">
							<a class="btn" href="html/chi-tiet.html?id=${p.id}">Chi tiết</a>
							<button class="btn secondary" onclick="addToCart(${p.id})">Thêm</button>
						</div>
					</article>
				`;
			}).join('');
		}

	// Render single product detail on chi-tiet.html
	function renderProductDetail(){
		const el=document.getElementById('product-detail'); if(!el) return;
		const params=new URLSearchParams(location.search); const id=Number(params.get('id'))||0;
		const p=products.find(x=>x.id===id);
		if(!p){ el.innerHTML='<p>Sản phẩm không tồn tại.</p>'; return; }
	const imagePath = resolveImagePath(p.image);
	el.innerHTML = `
		${imagePath ? `<img src="${imagePath}" alt="${p.name}" class="product-image" style="margin-bottom:16px;">` : ''}
			<p class="price">${formatPrice(p.price)}</p>
			<p>${p.desc}</p>
			<div style="margin-top:12px">
				<button class="btn" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
			</div>
		`;
	}

	// Contact form handling
	function handleContactSubmit(e){
		if(e) e.preventDefault();
		const form=document.getElementById('contact-form'); if(!form) return;
		const data = new FormData(form);
		const name=data.get('name'); const email=data.get('email'); const message=data.get('message');
		if(!name||!email||!message){ document.getElementById('contact-result').textContent='Vui lòng điền đầy đủ thông tin.'; return; }
		document.getElementById('contact-result').textContent='Đang gửi...';
		setTimeout(()=>{
			document.getElementById('contact-result').textContent='Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.';
			form.reset();
		},800);
	}

	// Expose some functions to global for inline handlers
	window.addToCart = addToCart;

	// Initialize on DOM ready
	document.addEventListener('DOMContentLoaded',function(){
		updateCartCount(); renderProducts(); renderProductDetail();
		renderFeatured();
		const form=document.getElementById('contact-form'); if(form) form.addEventListener('submit',handleContactSubmit);
	});
})();

