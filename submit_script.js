document.getElementById('submit-button').addEventListener('click', function() {
  const password = document.getElementById('password-input').value;
  if (password === 'TSakihabara') {
    setTimeout(function() {
      const content = document.getElementById('content');
      const textContainer = document.getElementById('text-container');
      content.style.display = 'none';
      textContainer.style.display = 'block';
      
      const lines = [
        "struct group_info init_groups = { .usage = ATOMIC_INIT(2) };",
        "struct group_info *groups_alloc(int gidsetsize){",
        "\tstruct group_info *group_info;",
        "\tint nblocks;",
        "\tint i;",
        "\tnblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK;",
        "\t/* Make sure we always allocate at least one indirect block pointer */",
        "\tnblocks = nblocks ? : 1;",
        "\tgroup_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER);",
        "\tif (!group_info)",
        "\t\treturn NULL;",
        "\tgroup_info->ngroups = gidsetsize;",
        "\tgroup_info->nblocks = nblocks;",
        "\tatomic_set(&group_info->usage, 1);",
        "\tif (gidsetsize <= NGROUPS_SMALL)",
        "\t\tgroup_info->blocks[0] = group_info->small_block;",
        "\telse {",
        "\t\tfor (i = 0; i < nblocks; i++) {",
        "\t\t\tgid_t *b;",
        "\t\t\tb = (void *)__get_free_page(GFP_USER);",
        "\t\t\tif (!b)",
        "\t\t\t\tgoto out_undo_partial_alloc;",
        "\t\t\tgroup_info->blocks[i] = b;",
        "\t\t}",
        "\t}",
        "\treturn group_info;",
        "",
        "out_undo_partial_alloc:",
        "\twhile (--i >= 0) {",
        "\t\tfree_page((unsigned long)group_info->blocks[i]);",
        "\t}",
        "\tkfree(group_info);",
        "\treturn NULL;",
        "}",
        "",
        "EXPORT_SYMBOL(groups_alloc);",
        ".",
        "....",
        "......."
      ];

      let index = 0;

      function displayLine() {
        if (index < lines.length) {
          const p = document.createElement('p');
          p.textContent = lines[index];
          textContainer.appendChild(p);
          index++;
          setTimeout(displayLine, 50);
        } else {
          setTimeout(function() {
            const p = document.createElement('p');
            p.textContent = 'access succeeded';
            textContainer.appendChild(p);
            setTimeout(function() {
              window.location.href = 'reborn.html';
            }, 1000);
          }, 2000);
        }
        
      }

      displayLine();
    }, 0);
  } else {
    alert('Incorrect password');
  }
});
