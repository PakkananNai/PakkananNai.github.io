window.onload = function() {
    // ฟังก์ชันลดขนาดปุ่มและเปลี่ยนเว็บเมื่อกดครบ 5 ครั้ง
    const btn4 = document.getElementById('btn4');
    let originalPadding = {
        topBottom: 15, // ขนาด padding บนล่าง
        leftRight: 40  // ขนาด padding ซ้ายขวา
    };
    let clickCount = 0; // ตัวนับจำนวนครั้งที่กด

    // ฟังก์ชันลดขนาดปุ่มเมื่อกด และเปลี่ยนหน้าเมื่อกดครบ 5 ครั้ง
    btn4.addEventListener('click', function() {
        clickCount++; // เพิ่มจำนวนครั้งที่กดทุกครั้งที่คลิก

        // ลดขนาด padding ลง 50% ทุกครั้งที่กด
        originalPadding.topBottom *= 0.5;
        originalPadding.leftRight *= 0.5;

        // อัพเดตขนาดปุ่มใน CSS
        btn4.style.padding = originalPadding.topBottom + 'px ' + originalPadding.leftRight + 'px';

        // ตรวจสอบว่ากดครบ 5 ครั้งหรือยัง
        if (clickCount >= 5) {
            window.location.href = 'page1.html'; // แทนที่ URL ตามที่คุณต้องการ
        }
    });
};

function btn1() {
    document.getElementById('text1').innerHTML = 'เรารักเอิร์นมากๆ เลยนะ เอิร์นรักเราไหมๆ';
    document.getElementById('cat').src = 'https://stickershop.line-scdn.net/sticonshop/v1/sticon/5d5a4462100cc368de43454c/iPhone/006.png?v=2';
    document.querySelector('.btn1').style.display = 'none';
    document.querySelector('.btn3').style.display = 'block';
    document.querySelector('.btn2').style.display = 'none';
    document.querySelector('.btn4').style.display = 'block';
}

function btn2() {
    document.getElementById('cat').style.display='none'
    document.getElementById('sad_cat').style.display='block'

    document.getElementById('text1').innerHTML = 'โอเครเลย🥹🥹🥹';
    document.querySelector('.btn1').style.display = 'none';
    document.querySelector('.btn2').style.display = 'none';
}

function btn3() {
    window.location.href="page2.html";
}
