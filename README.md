# Nike sls Api

<img src="https://img.shields.io/npm/v/@benbakhar/sls.svg?style=flat"/>

```js
import sls from 'sls'
```

## Get all nine clubs

```js
await sls.nineClub.get(query)
```

### Parameters

| field  | type   | required | description              |
|--------|--------|----------|--------------------------|
| limit  | number | false    | limit number of results  |
| skater | string | false    | filter results by skater |

### Response

Defined in [api/nine-club/index.ts](lib/api/nine-club/index.ts#L13)

## Get yearly world tour

```js
await sls.worldTour.get()
```

### Response
Defined in [api/world-tour/index.ts](lib/api/world-tour/index.ts#L12)

## Using through CLI

```bash
sls [command] [options]
```

### Examples

*Yield Shane's top 5 scores.*

```bash
sls nc -l 5 -s "Shane O'Neill"
```

--------------------------

#### Disclaimer
This project is experimental and not suitable for any production use 💜.
