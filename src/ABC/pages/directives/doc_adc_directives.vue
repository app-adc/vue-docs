<script setup lang="ts">
import BcButton from '@/ABC/components/BcButton.vue'
import BcIcon from '@/ABC/components/BcIcon.vue'
import BcInput from '@/ABC/components/BcInput.vue'
import BcLayout from '@/ABC/pages/bc_doc_layout.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const searchQuery = ref('')

// Function to normalize text for case-insensitive search
const normalizeText = (text: string): string => {
    if (typeof text !== 'string') return ''
    return text.toLowerCase().trim()
}

const highlightText = (text: string): string => {
    if (!searchQuery.value.trim()) return text
    const query = normalizeText(searchQuery.value)
    const regex = new RegExp(`(${query})`, 'gi')
    return text.replace(
        regex,
        '<mark class="bg-yellow-100 rounded px-1">$1</mark>'
    )
}

// รายละเอียดทั้งหมดของ utilities แยกตามหมวดหมู่
const utilityExamples = [
    {
        category: 'Array Utilities',
        description: 'ฟังก์ชันสำหรับจัดการ Array',
        functions: [
            {
                name: 'mapArray',
                description:
                    'แปลง Array ทุกตัวให้อยู่ในระดับเดียวกัน (Flatten)',
                code: `const nestedArray = [1, [2, 3, [4, 5, [6]]]]
const result = mapArray(nestedArray)
// result: [1, 2, 3, 4, 5, 6]`,
            },
            {
                name: 'chunkArray',
                description: 'แบ่ง Array เป็นชุดตามจำนวนที่กำหนด',
                code: `const items = [1, 2, 3, 4, 5] 
const result = chunkArray(items, 2)
// result: [[1, 2], [3, 4], [5]]`,
            },
            {
                name: 'checkItemDuplicate',
                description: 'ค้นหาค่าซ้ำใน Array โดยใช้ callback function',
                code: `const users = [
  { name: 'John', id: 1 },
  { name: 'John', id: 2 }
]

// ตรวจสอบชื่อซ้ำ
const hasDuplicateName = checkItemDuplicate(users, user => user.name)
// result: true

// ตรวจสอบหลายเงื่อนไข
const hasDuplicateNameAndId = checkItemDuplicate(
  users, 
  user => toCombineText([user.id, user.name])
)`,
            },
            {
                name: 'toChangePositionArray',
                description: 'สลับตำแหน่งข้อมูลใน Array',
                code: `const arr = [1, 2, 3, 4]
const result = toChangePositionArray(arr, 0, 3) 
// result: [4, 2, 3, 1]`,
            },
        ],
    },
    {
        category: 'Date Utilities',
        description: 'ฟังก์ชันสำหรับจัดการวันที่และเวลา',
        functions: [
            {
                name: 'addDate',
                description: 'เพิ่มหรือลดจำนวนวัน',
                code: `const date = new Date('2024-01-01')

// เพิ่ม 7 วัน
const futureDate = addDate(date, 7)  
// result: 2024-01-08

// ลด 3 วัน
const pastDate = addDate(date, -3)
// result: 2023-12-29`,
            },
            {
                name: 'addMonth',
                description: 'เพิ่มหรือลดจำนวนเดือน',
                code: `const date = new Date('2024-01-15')

// เพิ่ม 2 เดือน
const futureMonth = addMonth(date, 2)
// result: 2024-03-15

// ลด 1 เดือน  
const pastMonth = addMonth(date, -1)
// result: 2023-12-15`,
            },
            {
                name: 'addHour',
                description: 'เพิ่มหรือลดจำนวนชั่วโมง',
                code: `const date = new Date('2024-01-01 10:00:00')

// เพิ่ม 3 ชั่วโมง
const laterTime = addHour(date, 3)
// result: 2024-01-01 13:00:00

// ลด 2 ชั่วโมง
const earlierTime = addHour(date, -2)  
// result: 2024-01-01 08:00:00`,
            },
            {
                name: 'addMinute',
                description: 'เพิ่มหรือลดจำนวนนาที',
                code: `const date = new Date('2024-01-01 10:00:00')

// เพิ่ม 45 นาที
const laterMinutes = addMinute(date, 45)
// result: 2024-01-01 10:45:00  

// ลด 30 นาที
const earlierMinutes = addMinute(date, -30)
// result: 2024-01-01 09:30:00`,
            },
            {
                name: 'dateDiff',
                description: 'คำนวณความต่างของเวลาระหว่างสองวันที่',
                code: `const diff = dateDiff(date1, date2)
/* returns: {
  days: number        // จำนวนวัน 
  hours: number       // จำนวนชั่วโมงคงเหลือ
  hoursTotal: number  // จำนวนชั่วโมงทั้งหมด
  minutesTotal: number // จำนวนนาทีทั้งหมด
  minutes: number     // จำนวนนาทีคงเหลือ
  seconds: number     // จำนวนวินาทีคงเหลือ
  secondsTotal: number // จำนวนวินาทีทั้งหมด  
} */`,
            },
            {
                name: 'dateDiffToString',
                description: 'แปลงความต่างของเวลาเป็นข้อความภาษาไทยหรืออังกฤษ',
                code: `// ภาษาไทย
const diffThai = dateDiffToString(date1, date2, 'th')
// returns: "2 วัน 3 ชั่วโมง 45 นาที"

// ภาษาอังกฤษ
const diffEng = dateDiffToString(date1, date2, 'en') 
// returns: "2 days 3 hours 45 minutes"`,
            },
            {
                name: 'dateToCombine',
                description: 'แปลงวันที่เป็น string format',
                code: `const date = new Date('2024-01-15')
const result = dateToCombine(date)
// returns: { valueOfDate: '2024-01-15' }`,
            },
        ],
    },
    {
        category: 'Object Utilities',
        description: 'ฟังก์ชันสำหรับจัดการ Object',
        functions: [
            {
                name: 'checkObject',
                description: 'ตรวจสอบ key ใน object (รองรับ nested path)',
                code: `const payload = {
  user: {
    profile: { name: 'John' },
    orders: [{ id: 1, total: 100 }]
  }
}

// ตรวจสอบหลาย paths
const exists = checkObject(payload, [
  'user.profile.name',
  'user.orders[0].total' 
])
// result: true`,
            },
            {
                name: 'createObj',
                description: 'สร้าง object ใหม่จาก key-value pairs',
                code: `const obj = createObj([
  ['name', 'John'],
  ['age', 30]
])
// result: { name: 'John', age: 30 }`,
            },
            {
                name: 'mergeObject',
                description: 'รวม objects แบบ deep merge',
                code: `const obj1 = { 
  name: 'John',
  profile: { color: 'red' }
}

const obj2 = {
  profile: { email: 'john@email.com' }  
}

const merged = mergeObject(obj1, obj2)
/* result: {
  name: 'John',
  profile: {
    color: 'red', 
    email: 'john@email.com'
  }
} */`,
            },
            {
                name: 'validateObject',
                description: 'ตรวจสอบความถูกต้องของ object ตาม schema',
                code: `const payload = { 
  id: 1,
  user: {
    name: 'John',
    email: 'john@email.com'  
  } 
}

const validation = validateObject(
  payload,
  ['id', 'user.name', 'user.email'],
  'Validation Error' 
)
// returns: { status: 1, message: 'success' }`,
            },
        ],
    },
    {
        category: 'String Utilities',
        description: 'ฟังก์ชันสำหรับจัดการข้อความ',
        functions: [
            {
                name: 'toCombineText',
                description: 'รวม Array ของข้อความด้วยตัวคั่นที่กำหนด',
                code: `// รวมข้อความด้วย delimiter
const parts = ['John', 'Doe', '30']
const result1 = toCombineText(parts, ' | ')
// result: "John | Doe | 30"

// รวมข้อความจากหลายประเภท
const mixed = ['Product', 123, true]
const result2 = toCombineText(mixed, '-')
// result: "Product-123-true"`,
            },
            {
                name: 'toHasKey',
                description: 'ลบอักขระพิเศษและช่องว่าง สำหรับใช้เป็น key',
                code: `const text = '  User-Name__123 !@# '
const key = toHasKey(text)
// result: 'username_123'

// เหมาะสำหรับแปลงเป็น key ที่ปลอดภัย
const filename = 'My Document (2024).pdf'
const safeKey = toHasKey(filename)
// result: 'mydocument2024pdf'`,
            },
        ],
    },
    {
        category: 'Number Utilities',
        description: 'ฟังก์ชันสำหรับจัดการตัวเลข',
        functions: [
            {
                name: 'toNumber',
                description: 'แปลงค่าเป็นตัวเลข',
                code: `toNumber('123') // 123
toNumber('12.34') // 12.34
toNumber('abc') // 0
toNumber(null) // 0`,
            },
            {
                name: 'toCurrency',
                description: 'จัดรูปแบบตัวเลขให้อยู่ในรูปแบบเงิน',
                code: `// จัดรูปแบบตัวเลขทศนิยม 2 ตำแหน่ง
const price = 1234567.89
const formatted = toCurrency(price, 2)
// result: "1,234,567.89"

// จัดรูปแบบตัวเลขไม่มีทศนิยม
const wholeNumber = 1000000
const noDecimal = toCurrency(wholeNumber, 0)
// result: "1,000,000"`,
            },
            {
                name: 'toRandomNumber',
                description: 'สุ่มตัวเลขในช่วงที่กำหนด',
                code: `// สุ่มตัวเลข 1-10
const random = toRandomNumber(1, 10) 
// returns: random number between 1-10`,
            },
        ],
    },
    {
        category: 'Composition Utilities',
        description: 'ฟังก์ชันสำหรับการเชื่อมต่อการทำงาน',
        functions: [
            {
                name: 'ci (Chain/Compose)',
                description: 'เชื่อมต่อการทำงานของหลายฟังก์ชันเข้าด้วยกัน',
                code: `// ตัวอย่างการใช้งานพื้นฐาน
const result1 = ci(
  5,
  x => x + 1,    // 6
  x => x * 2     // 12
)
// result: 12

// ตัวอย่างการใช้งานกับข้อความ
const result2 = ci(
  '  HELLO world  ',
  str => str.trim(),          // "HELLO world"
  str => str.toLowerCase(),   // "hello world"
  str => str.replace(' ', '_') // "hello_world"
)
// result: "hello_world"`,
            },
            {
                name: 'withCi',
                description: 'สร้าง function composition wrapper',
                code: `const addOne = x => x + 1
const double = x => x * 2

const compute = withCi(
  addOne,
  double
)

compute(5) // 12`,
            },
        ],
    },
    {
        category: 'Conversion Utilities',
        description: 'ฟังก์ชันสำหรับแปลงข้อมูลระหว่างรูปแบบต่างๆ',
        functions: [
            {
                name: 'toUid',
                description: 'สร้าง unique identifier',
                code: `// สร้าง uid ความยาว 8 ตัวอักษร
const id = toUid(8)
// result: "a1b2c3d4"

// สร้าง uid ความยาว 16 ตัวอักษร
const longId = toUid(16)
// result: "a1b2c3d4e5f6g7h8"`,
            },
            {
                name: 'toDate',
                description: 'แปลงข้อมูลเป็น Date object',
                code: `const date1 = toDate('2024-01-15')
// result: Date object

const date2 = toDate('15/01/2024', 'DD/MM/YYYY')
// result: Date object with custom format`,
            },
            {
                name: 'toRegExp',
                description: 'สร้าง RegExp object จากรูปแบบที่กำหนด',
                code: `const regex1 = toRegExp('^[0-9]+$')
// result: /^[0-9]+$/

const regex2 = toRegExp('^[a-z]+$', 'i')
// result: /^[a-z]+$/i`,
            },
            {
                name: 'toConvertData',
                description: 'แปลงข้อมูลตามรูปแบบที่กำหนด',
                code: `const data = {
  name: 'John',
  age: '30',
  active: 'true'
}

const converted = toConvertData(data, {
  name: String,
  age: Number,
  active: Boolean
})
// result: { name: "John", age: 30, active: true }`,
            },
        ],
    },
    {
        category: 'Process Management',
        description: 'ฟังก์ชันสำหรับจัดการกระบวนการทำงาน',
        functions: [
            {
                name: 'runProcess',
                description: 'จัดการการทำงานแบบลำดับขั้นตอน',
                code: `const process = runProcess([
  async (data) => { /* step 1 */ },
  async (data) => { /* step 2 */ },
  async (data) => { /* step 3 */ }
])

const result = await process(initialData)`,
            },
            {
                name: 'mapToKeys',
                description: 'แปลง array เป็น object โดยใช้ key ที่กำหนด',
                code: `const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]

const result = mapToKeys(users, 'id')
// result: { 
//   "1": { id: 1, name: 'John' },
//   "2": { id: 2, name: 'Jane' }
// }`,
            },
            {
                name: 'selectObject',
                description: 'เลือกเฉพาะ properties ที่ต้องการจาก object',
                code: `const user = {
  id: 1,
  name: 'John',
  email: 'john@email.com',
  password: '123456'
}

const result = selectObject(user, ['id', 'name'])
// result: { id: 1, name: 'John' }`,
            },
            {
                name: 'checkNestedValue',
                description: 'ตรวจสอบค่าใน nested object',
                code: `const data = {
  user: {
    profile: {
      name: 'John'
    }
  }
}

const hasName = checkNestedValue(data, 'user.profile.name')
// result: true`,
            },
        ],
    },
    {
        category: 'Higher-order Functions',
        description: 'ฟังก์ชันที่รับหรือคืนค่าเป็นฟังก์ชัน',
        functions: [
            {
                name: 'withAddDate/Hour/Month/Minute',
                description: 'สร้างฟังก์ชันเพิ่ม/ลดวันที่แบบกำหนดค่าล่วงหน้า',
                code: `// สร้างฟังก์ชันเพิ่มวันที่ 7 วัน
const addWeek = withAddDate(7)
const nextWeek = addWeek(new Date())

// สร้างฟังก์ชันเพิ่มเวลา 30 นาที
const addHalfHour = withAddMinute(30)
const laterTime = addHalfHour(new Date())`,
            },
            {
                name: 'withCombineText',
                description: 'สร้างฟังก์ชันรวมข้อความแบบกำหนดตัวคั่นล่วงหน้า',
                code: `// สร้างฟังก์ชันรวมข้อความด้วย |
const combineWithPipe = withCombineText('|')
const result = combineWithPipe(['a', 'b', 'c'])
// result: "a|b|c"`,
            },
            {
                name: 'withDateDiff',
                description:
                    'สร้างฟังก์ชันคำนวณความต่างของเวลาแบบกำหนดรูปแบบล่วงหน้า',
                code: `const getDiffInDays = withDateDiff('days')
const days = getDiffInDays(date1, date2)
// result: number of days between dates`,
            },
            {
                name: 'withCi',
                description:
                    'สร้างฟังก์ชัน composition แบบกำหนดลำดับการทำงานล่วงหน้า',
                code: `const process = withCi(
  (x: number) => x + 1,
  (x: number) => x * 2
)

const result = process(5)  // 12`,
            },
        ],
    },
]

// Display results with highlighting
const displayResults = computed(() => {
    if (!searchQuery.value.trim()) {
        // Show all data when no search query
        return utilityExamples.map((category) => ({
            ...category,
            functions: category.functions.map((func) => ({
                ...func,
                highlightedName: func.name,
                highlightedDescription: func.description,
                highlightedCode: func.code,
            })),
        }))
    }

    const query = normalizeText(searchQuery.value)

    return utilityExamples
        .map((category) => {
            const filteredFunctions = category.functions
                .filter(
                    (func) =>
                        normalizeText(func.name).includes(query) ||
                        normalizeText(func.description).includes(query) ||
                        normalizeText(func.code).includes(query)
                )
                .map((func) => ({
                    ...func,
                    highlightedName: highlightText(func.name),
                    highlightedDescription: highlightText(func.description),
                    highlightedCode: highlightText(func.code),
                }))

            if (filteredFunctions.length === 0) return null

            return {
                ...category,
                functions: filteredFunctions,
            }
        })
        .filter(Boolean)
})

// Add search stats
const searchStats = computed(() => {
    if (!searchQuery.value.trim()) return null

    const totalFunctions = displayResults.value.reduce(
        (sum, category) => sum + (category ? category.functions.length : 0),
        0
    )

    return {
        categories: displayResults.value.length,
        functions: totalFunctions,
    }
})

// Installation and basic usage codes
const installationCode = `npm install adc-directive`

const basicUsageCode = `import { 
    mapArray,
    dateDiff,
    toCurrency,
    mergeObject,
    checkObject,
    validateObject,
    toCombineText,
    toHasKey,
    ci
} from 'adc-directive'`

const typeSafetyExamples = [
    {
        category: 'Type Safety',
        description: 'แนวทางการใช้ TypeScript type safety อย่างมีประสิทธิภาพ',
        functions: [
            {
                name: 'Generic Types',
                description:
                    'การใช้งาน Generic Types เพื่อความยืดหยุ่นและ type safety',
                code: `// Example with Generic Array Functions
function processItems<T>(items: ReadonlyArray<T>, callback: (item: T) => void): void {
  items.forEach(callback)
}

// Example with Generic Object Functions  
function getNestedValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

// Generic Constraint Example
function merge<T extends object, U extends object>(obj1: T, obj2: U) {
  return { ...obj1, ...obj2 }
}`,
            },
            {
                name: 'Readonly Types',
                description:
                    'การป้องกันการแก้ไขข้อมูลโดยไม่ตั้งใจด้วย Readonly types',
                code: `// Using Readonly type
function processData(data: Readonly<SomeType>): ResultType {
  // data cannot be modified here
  return transformedData
}

// Readonly array
const numbers: ReadonlyArray<number> = [1, 2, 3]
// numbers.push(4) // Error!

// Readonly properties
interface Config {
  readonly apiKey: string
  readonly endpoint: string
}`,
            },
            {
                name: 'Type Guards',
                description: 'การตรวจสอบประเภทข้อมูลที่ runtime',
                code: `// Custom type guard
function isUser(obj: any): obj is User {
  return 'id' in obj && 'name' in obj
}

// Using type guard
function processUser(input: unknown) {
  if (isUser(input)) {
    // TypeScript knows input is User here
    console.log(input.name)
  }
}

// Tagged unions
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string }`,
            },
        ],
    },
    {
        category: 'Best Practices',
        description: 'แนวทางการใช้งานที่แนะนำและข้อควรระวัง',
        functions: [
            {
                name: 'Type Safety Best Practices',
                description: 'แนวทางการใช้ TypeScript ให้มีประสิทธิภาพ',
                code: `// DO: Use strict type checking
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// DON'T: Avoid using 'any'
// Bad
function process(data: any) { ... }

// Good
function process<T>(data: T) { ... }

// DO: Use type inference when possible
// Let TypeScript infer the types
const numbers = [1, 2, 3] // Type: number[]
const user = { name: 'John', age: 30 } // Type: { name: string, age: number }`,
            },
            {
                name: 'Performance Considerations',
                description: 'แนวทางการเขียนโค้ดให้มีประสิทธิภาพ',
                code: `// DO: Avoid unnecessary object creation
// Bad
items.map(x => ({ ...x, modified: true }))

// Good
items.map(x => Object.assign({}, x, { modified: true }))

// DON'T: Avoid excessive type casting
// Bad
(obj as any).someProperty

// Good
if (isValidObject(obj)) {
  obj.someProperty
}

// DO: Use appropriate data structures
// Bad: Searching in array
const found = array.find(x => x.id === searchId)

// Good: Using Map for lookups
const map = new Map(array.map(x => [x.id, x]))
const found = map.get(searchId)`,
            },
            {
                name: 'Code Organization',
                description: 'แนวทางการจัดการโค้ดให้เป็นระเบียบ',
                code: `// DO: Group related functionality
// types.ts
interface User { ... }
type UserRole = 'admin' | 'user'

// utils.ts
export const formatUser = (user: User) => { ... }
export const validateUser = (user: User) => { ... }

// DO: Use barrel exports
// index.ts
export * from './types'
export * from './utils'
export * from './constants'

// DON'T: Mix business logic with utilities
// Bad
function utilityFunction() {
  // Business logic here
  // Utility code here
}

// Good
// business-logic.ts
function processBusiness() { ... }
// utils.ts
function utilityFunction() { ... }`,
            },
        ],
    },
]
const copyCode = async (code: string) => {
    try {
        await navigator.clipboard.writeText(code)
        // Could add toast notification here
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}

// Scroll to section on mount and route hash change
const scrollToSection = () => {
    if (route.hash) {
        const element = document.querySelector(route.hash)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }
}

onMounted(() => {
    scrollToSection()
})

watch(
    () => route.hash,
    () => scrollToSection()
)
</script>

<template>
    <BcLayout
        title="ADC Directive"
        subtitle="Utility functions สำหรับ TypeScript/JavaScript โดยเฉพาะสำหรับ Vue.js applications"
        icon="Code"
    >
        <!-- Search Section -->
        <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Search" size="24" color="primary" />
                <div class="flex-1">
                    <h2 class="text-xl font-bold">ค้นหาฟังก์ชัน</h2>
                    <p class="text-sm text-slate-600 mt-1">
                        ค้นหาจากชื่อฟังก์ชัน คำอธิบาย หรือโค้ดตัวอย่าง
                    </p>
                </div>
            </div>

            <div class="flex flex-col gap-4">
                <BcInput
                    id="search-functions"
                    :data-value="searchQuery"
                    @input="(value) => (searchQuery = value || '')"
                    placeholder="พิมพ์คำค้นหา..."
                    icon="Search"
                />

                <!-- Search Results Stats -->
                <div
                    v-if="searchQuery.trim() && searchStats"
                    class="text-sm text-slate-600 animate-fade-in"
                >
                    พบ {{ searchStats.functions }} ฟังก์ชัน ใน
                    {{ searchStats.categories }} หมวดหมู่
                </div>
            </div>
        </section>

        <!-- Installation -->
        <section
            v-if="!searchQuery.trim() && !searchStats"
            id="installation"
            class="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Package" size="24" color="primary" />
                <h2 class="text-xl font-bold">การติดตั้ง</h2>
            </div>

            <div class="relative bg-slate-800 rounded-lg p-4">
                <BcButton
                    @click="() => copyCode(installationCode)"
                    variant="white"
                    icon="Copy"
                    class="!absolute top-3 right-3"
                    size="sm"
                />
                <pre
                    class="text-sm text-slate-200"
                ><code>{{ installationCode }}</code></pre>
            </div>
        </section>
        <!-- Basic Usage -->
        <section
            v-if="!searchQuery.trim() && !searchStats"
            id="basic-usage"
            class="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="FileCode" size="24" color="primary" />
                <h2 class="text-xl font-bold">การใช้งานพื้นฐาน</h2>
            </div>

            <div class="relative bg-slate-800 rounded-lg p-4">
                <BcButton
                    @click="() => copyCode(basicUsageCode)"
                    variant="white"
                    icon="Copy"
                    class="!absolute top-3 right-3"
                    size="sm"
                />
                <pre
                    class="text-sm text-slate-200"
                ><code>{{ basicUsageCode }}</code></pre>
            </div>
        </section>

        <!-- Function Categories -->
        <template v-for="category in displayResults" :key="category.category">
            <section
                :id="category?.category?.toLowerCase().replace(/ /g, '-')"
                class="mb-8"
            >
                <!-- Category header -->
                <div class="flex items-center gap-3 mb-6 pt-4">
                    <BcIcon name="Code" size="24" color="primary" />
                    <div>
                        <h2 class="text-xl font-bold">
                            {{ category?.category }}
                        </h2>
                        <p class="text-sm text-slate-600 mt-1">
                            {{ category?.description }}
                        </p>
                    </div>
                </div>

                <!-- Functions -->
                <div class="space-y-6">
                    <div
                        v-for="func in category?.functions"
                        :key="func.name"
                        :id="func.name.toLowerCase().replace(/[^a-z0-9]/g, '-')"
                        class="bg-white rounded-xl shadow-lg p-6"
                    >
                        <h3
                            class="text-lg font-bold mb-2"
                            v-html="func.highlightedName"
                        ></h3>
                        <p
                            class="text-slate-600 mb-4"
                            v-html="func.highlightedDescription"
                        ></p>
                        <div class="relative bg-slate-800 rounded-lg p-4">
                            <BcButton
                                @click="() => copyCode(func.code)"
                                variant="white"
                                icon="Copy"
                                class="!absolute top-3 right-3"
                                size="sm"
                            />
                            <pre
                                class="text-sm text-slate-200"
                            ><code v-html="func.highlightedCode"></code></pre>
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <template v-if="!displayResults.length">
            <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                <p class="text-lg text-slate-600">ไม่พบข้อมูลที่ค้นหา</p>
            </div>
        </template>

        <!-- Type Safety -->
        <section
            id="type-safety"
            class="bg-white rounded-xl shadow-lg p-6 mb-8 mt-8"
        >
            <div
                class="grid items-center gap-3 mb-6"
                v-for="(data, index) in typeSafetyExamples"
                :key="index"
            >
                <BcIcon name="Shield" size="24" color="primary" />
                <div>
                    <h2 class="text-xl font-bold">{{ data.category }}</h2>
                    <p class="text-sm text-slate-600 mt-1">
                        {{ data.description }}
                    </p>
                </div>
                <div class="grid gap-6" v-for="d in data.functions">
                    <div class="bg-slate-50 p-6 rounded-lg grid gap-2">
                        <h3 class="font-bold text-lg">
                            {{ d.name }}
                        </h3>
                        <p>{{ d.description }}</p>
                        <div class="relative bg-slate-800 rounded-lg p-4">
                            <BcButton
                                @click="() => copyCode(d.code)"
                                variant="white"
                                icon="Copy"
                                class="!absolute top-3 right-3"
                                size="sm"
                            />
                            <pre
                                class="text-sm text-slate-200"
                            ><code>{{ d.code }}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- suggestions-feedback -->
        <section
            id="suggestions-feedback"
            class="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
            <div class="flex items-center gap-3 mb-6">
                <BcIcon name="Lightbulb" size="24" color="primary" />
                <h2 class="text-xl font-bold">แนวทางการใช้งานที่แนะนำ</h2>
            </div>

            <!-- Do's and Don'ts Grid -->
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Do's -->
                <div class="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 class="font-bold text-green-800 mb-4">
                        ควรปฏิบัติ (Do's)
                    </h3>
                    <ul class="space-y-4">
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="Check"
                                size="20"
                                class="text-green-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-green-800">
                                    ใช้ TypeScript Type-Safety
                                </p>
                                <p class="text-sm text-green-700 mt-1">
                                    เปิดใช้ strict mode และกำหนด type ให้ชัดเจน
                                </p>
                            </div>
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="Check"
                                size="20"
                                class="text-green-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-green-800">
                                    ใช้ Function Composition
                                </p>
                                <p class="text-sm text-green-700 mt-1">
                                    แยกโค้ดเป็นฟังก์ชันย่อยๆ ที่ทำงานเฉพาะอย่าง
                                </p>
                            </div>
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="Check"
                                size="20"
                                class="text-green-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-green-800">
                                    ใช้ Immutable Data
                                </p>
                                <p class="text-sm text-green-700 mt-1">
                                    หลีกเลี่ยงการแก้ไขข้อมูล input โดยตรง
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Don'ts -->
                <div class="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h3 class="font-bold text-red-800 mb-4">
                        ไม่ควรปฏิบัติ (Don'ts)
                    </h3>
                    <ul class="space-y-4">
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="X"
                                size="20"
                                class="text-red-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-red-800">
                                    หลีกเลี่ยง any type
                                </p>
                                <p class="text-sm text-red-700 mt-1">
                                    ใช้ proper typing แทนการใช้ any
                                </p>
                            </div>
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="X"
                                size="20"
                                class="text-red-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-red-800">
                                    ไม่ Mutate ข้อมูล Input
                                </p>
                                <p class="text-sm text-red-700 mt-1">
                                    สร้าง copy ของข้อมูลก่อนแก้ไขเสมอ
                                </p>
                            </div>
                        </li>
                        <li class="flex items-start gap-2">
                            <BcIcon
                                name="X"
                                size="20"
                                class="text-red-600 flex-shrink-0 mt-1"
                            />
                            <div>
                                <p class="font-medium text-red-800">
                                    ไม่ซ้อนฟังก์ชันมากเกินไป
                                </p>
                                <p class="text-sm text-red-700 mt-1">
                                    แยกโค้ดเป็นฟังก์ชันที่มีความซับซ้อนพอเหมาะ
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Additional Tips -->
            <div class="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 class="font-bold text-blue-800 mb-4">เคล็ดลับเพิ่มเติม</h3>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-medium text-blue-800 mb-2">
                            Performance Tips
                        </h4>
                        <ul class="space-y-2 text-sm text-blue-700">
                            <li class="flex items-center gap-2">
                                <BcIcon
                                    name="Zap"
                                    size="16"
                                    class="text-blue-600"
                                />
                                ใช้ cached results สำหรับการคำนวณที่ซับซ้อน
                            </li>
                            <li class="flex items-center gap-2">
                                <BcIcon
                                    name="Zap"
                                    size="16"
                                    class="text-blue-600"
                                />
                                หลีกเลี่ยงการ loop ซ้อน loop
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-medium text-blue-800 mb-2">
                            Debugging Tips
                        </h4>
                        <ul class="space-y-2 text-sm text-blue-700">
                            <li class="flex items-center gap-2">
                                <BcIcon
                                    name="Bug"
                                    size="16"
                                    class="text-blue-600"
                                />
                                ใช้ TypeScript strict mode
                            </li>
                            <li class="flex items-center gap-2">
                                <BcIcon
                                    name="Bug"
                                    size="16"
                                    class="text-blue-600"
                                />
                                เขียน unit tests ให้ครอบคลุม
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Show message when no results found -->
        <div
            v-if="searchQuery.trim() && displayResults.length === 0"
            class="bg-slate-50 rounded-xl p-8 text-center"
        >
            <BcIcon
                name="Search"
                size="48"
                class="mx-auto mb-4 text-slate-400"
            />
            <h3 class="text-lg font-bold text-slate-700">ไม่พบผลการค้นหา</h3>
            <p class="text-slate-600 mt-2">
                ลองใช้คำค้นหาอื่น หรือตรวจสอบการสะกดอีกครั้ง
            </p>
        </div>
    </BcLayout>
</template>

<style scoped>
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}

code {
    font-family: ui-monospace, monospace;
}

.bg-slate-800 :deep(.bg-white) {
    --tw-bg-opacity: 0.9;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-slate-800 :deep(.bg-white:hover) {
    --tw-bg-opacity: 1;
}

section {
    scroll-margin-top: 6rem;
}

/* Smooth scroll behavior */
:deep(html) {
    scroll-behavior: smooth;
}

/* Highlight active section */
section:target {
    animation: highlight 1s ease-out;
}

@keyframes highlight {
    0% {
        background-color: rgba(var(--primary), 0.1);
    }
    100% {
        background-color: transparent;
    }
}

/* Add animation for search results */
.animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

:deep(mark) {
    background-color: rgb(254 243 199);
    padding: 0 0.25rem;
    border-radius: 0.25rem;
    font-weight: 500;
}

/* For highlighted code */
pre :deep(mark) {
    background-color: rgba(254, 243, 199, 0.2);
    color: inherit;
}
</style>
