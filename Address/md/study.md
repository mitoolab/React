2017.08.07(월) 
# Address 만들기


## 주의
1. React hot roder 
- 스테이트를 파괴시키지 않고 유지 시키는 부작용으로 리엑트 컴포넌트가 리로딩 될때 컨스트러터를 실행하지 않는다.
- 수동 새로고침을 해야한다.

## 내용
1. input value를 공백으로 설정하면 고정되기 때문에 입력되지 않는다. 변경해야한다.


## 메소드
1. sort
- 배열을 올림차순, 내림차순으로 정리한다.
- 음수, 양수, 0 에 따라 정렬을 한다.
- 기존 배열을 재 정리함
`arr.sort([옵션값])`
- 옵션값을 생략하면 배열을 유니코드(문자)로 인식하여 정렬한다.
- 숫자를 비교하려면
```js
function compareNumbers(a,b) {
  return a - b;
}
```
```js
scores.sort(compareNumbers)
```
- 내림차순
```js
function compareNumbers(a,b) {
  return (a - b) * -1;
}
```

2. filter
- 해당 함수가 만족하는 값만 골라서 새로운 배열을 만듬
```js
function isBigEnough(value) {
  return value >- 10;
}

var filtered = [12, 5, 8, 130, 44];
var filters.filter(isBigEnough);
// filtered = [12, 5, 8, 130, 44];
// filters = [12, 5, 130, 44];
```


주소록 선택기능 구현



state 내부 배열 처리
- 배열의 내장함수 push를 사용하면 안된다.

- 방법
1. `cancat()` 사용한다.
- 기존 배열은 유지하며 새로운 배열을 생성
```js
this.setState({
  list:this.state.list.concat(newObj)
})
```

2. Immutability Helper (immutable.js)
- 객체나 배열을 쉽게 수정할 수 있는 페이스북 라이브러리
- 설치
```js
npm install --save react-adons-update
```
컴포넌트에 import
```js
import updated from 'react-addons-update';
```
- 사용방법
```js
this.setState({
  list:update(
    <!-- 첫번째 인수 : 처리해야할 객체나 배열 -->
    this.state.list,
    <!-- 두번째 인수 : 처리명령을 가지고 있는 객체 -->
    {
      <!-- push를 통해 추가 (1개를 추가해도 [] 형태로 추가) -->
      $push:[newObj, newObj2]
      <!-- 한개의 데이터를 제거, [[시작하는 인덱스, 삭제갯수]] -->
      $splice: [[index,1]]
      <!-- 원소 수정 -->
      [index]: {
        field: {$set: "value"},
        field2: {$set: "value2"}
      }
    }
  )
});
```

```js
let object = {
  a: '1',
  b: '2',
  c: {
    d: '3',
    e: '4',
    f: {
      chang_this_value:'0',
      this_stays_same: '6'
    }
  }
}
```
- 직접 접근하면 안되기 때문에 `Immutability Helper`를 사용한다.

```js
let change = update(object, {
  c: {
    f: {
      change_this_value: {
        $set: '5'
      }
    }
  }
});
```
- 스프레드 연산자
```js
let changed = {
  ...object,
  c: {
    ...object.c,
    f: {
      ...object.c.f,
      chang_this_value:'5'
    }
  }
}
```