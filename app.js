document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديد الـ API Endpoint
    const API_URL = 'http://localhost:3000/api/vehicles';
    const carsContainer = document.getElementById('cars-container');

    // 2. استخدام دالة fetch لجلب البيانات
    fetch(API_URL)
        .then(response => response.json()) // تحويل الاستجابة إلى كائنات JS
        .then(vehicles => {
            if (vehicles.length === 0) {
                carsContainer.innerHTML = '<p>لا توجد سيارات معروضة حالياً.</p>';
                return;
            }

            // 3. التكرار عبر البيانات وإنشاء HTML
            vehicles.forEach(car => {
                const card = document.createElement('div');
                card.className = 'car-card'; 

                // إنشاء محتوى البطاقة باستخدام بيانات السيارة
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${car.image_url || 'default-car.jpg'}" alt="${car.make} ${car.model}">
                    </div>
                    <div class="card-details">
                        <h2>${car.make} ${car.model}</h2>
                        <p><strong>السنة:</strong> ${car.year}</p>
                        <p><strong>المسافة:</strong> ${car.mileage} كم</p>
                        <p class="price">${parseFloat(car.price).toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' })}</p>
                        <a href="#">عرض التفاصيل</a>
                    </div>
                `;
                carsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            carsContainer.innerHTML = `<p>خطأ في تحميل البيانات: تأكد من أن خادم Node.js يعمل.</p>`;
        });
});