import { select } from 'd3-selection'

class HierarchicalSelection {
  constructor (element, selector) {
    this._elements_by_path = {}

    var nodes = []
    element.selectAll(selector).each(function () { nodes.push(this) })

    var nodeHierarchy = []
    var hierarchyByNode = {}
    nodes.forEach(function (h) {
      return function (node, i) {
        var parent = findParent(node, nodes)
        var n = { 'node': node, 'children': [] }
        if (parent) {
          var p = hierarchyByNode[parent]
          n['path'] = p['path'].concat([p['children'].length])
          p['children'].push(n)
        } else {
          n['path'] = [nodeHierarchy.length]
          nodeHierarchy.push(n)
        }
        hierarchyByNode[node] = n
        h._elements_by_path[n['path']] = select(node)
      }
    }(this))
  }

  forEach (callback) {
    for (let path of Object.keys(this._elements_by_path)) {
      path = path.split(',').map(x => parseInt(x))
      callback(path, this._elements_by_path[path])
    }
  }

  elementByPath (path) {
    return this._elements_by_path[path]
  }
}

function findParent (child, nodes) {
  if (child.parentNode == null) {
    return null
  }
  if (nodes.includes(child.parentNode)) {
    return child.parentNode
  } else {
    return findParent(child.parentNode, nodes)
  }
}

export function selectHierarchy (rootSelector, childSelector) {
  return new HierarchicalSelection(rootSelector, childSelector)
}
