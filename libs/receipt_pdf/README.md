# Receipt Report
>...

### receipt
| Name | Type | Description
| ----|----|----------- 
receiptId | string | idใบเสร็จ
refId | string | หมายเลขอ้างอิง
customer | [{customer}](#customer) | ข้อมูลลูกค้า
list | [{list}](#list) | รายการสินค้า
subTotal | number | ราคารวมของสินค้า
discount | number | ส่วนลดท้ายบิล
vat | number | ภาษี
date | datetime | วันที่
grandTotal | number | ยอดสุทธิ
remark | string | หมายเหตุ

### customer
| Name | Type | Description
| ----|----|----------- 
name | string | ชื่อลูกค้า / บริษัท 
branchId | string | หมายเลขสาขา
branchName | string | ชื่อสาขา
address | string | ที่อยู่
taxId | string | เลขประจำตัวผู้เสียภาษี

### list
| Name | Type | Description
| ----|----|----------- 
name | string | ชื่อสินค้า
qty | number | จำนวน
unitPrice | number | ราคาขายต่อหน่วย
itemDiscount | number | ส่วนลดสินค้า
total | number | ราคารวม