import ping from "./ping";
import push from "./push";
import create from "./create";
import dlt from "./delete";

const events = { ping, push, create, delete: dlt }

export default events