import { select } from 'd3-selection'

class HierarchicalSelection {
  constructor (element, selector) {
    this._elements_by_path = {}

    var nodes = []
    element.selectAll(selector).each(function () {
      nodes.push({ 'node': this, 'children': [] })
    })

    var nodeHierarchy = []
    nodes.forEach(function (h, nodes) {
      return function (node, i) {
        var parent = findParent(node['node'], nodes)
        if (parent) {
          node['path'] = parent['path'].concat([parent['children'].length])
          parent['children'].push(node)
        } else {
          node['path'] = [nodeHierarchy.length]
          nodeHierarchy.push(node)
        }
        h._elements_by_path[node['path']] = select(node['node'])
      }
    }(this, nodes))
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
  for (let n of nodes) {
    if (n['node'] === child.parentNode) {
      return n
    }
  }
  return findParent(child.parentNode, nodes)
}

export function selectHierarchy (rootSelector, childSelector) {
  return new HierarchicalSelection(rootSelector, childSelector)
}
