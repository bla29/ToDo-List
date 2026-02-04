export default remove = {
    remove(list, itemIndex) {
        list.splice(itemIndex, 1);
        return list;
    }
}