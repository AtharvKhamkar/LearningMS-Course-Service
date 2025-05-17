export default class Connections{
    static connections = {};

    static set(key, connections){
        Connections.connections[key] = connections;
    }

    static get(key){
        if(key){
            return Connections.connections[key] ? Connections.connections[key] : false;
        }
        return Connections.connections[key];
    }
}