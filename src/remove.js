export default {
    remove(list, item) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].title == item.title) {
                list.splice(i, 1);
            }
        }
        return list;
    }
}