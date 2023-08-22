const { Paginator } = require("../dist")

const print = () => {
  console.log(`current: ${paginator.getCurrent()}, items: ${paginator.getItems()}, state: ${JSON.stringify(paginator.getState())}`)
}

const paginator = new Paginator(1, 634)
print()

paginator.nextPage()
print()

paginator.nextPage()
print()

paginator.nextPage()
print()

paginator.nextPage()
print()

paginator.nextPage()
print()

paginator.setCurrent(177)

paginator.prevPage()
print()

paginator.prevPage()
print()

paginator.prevPage()
print()

paginator.last()
print()

paginator.first()
print()