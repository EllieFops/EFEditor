BlockType = {
    /**
     * Block element
     *
     * Opening and closing tags will be preceded and followed by new line characters.
     *
     * <pre>
     *   [SIBLING]
     *   &lt;TAG&gt;
     *     [INNER CONTENT]
     *   &lt;/TAG&gt;
     *   [SIBLING]
     * </pre>
     */
    BLOCK: 0,

    /**
     * Inline Element
     *
     * Opening and closing tags will be inline with parent content and child content.
     *
     * <pre>
     *   [SIBLING] &lt;TAG&gt;[INNER CONTENT]&lt;/TAG&gt; [SIBLING]
     * </pre>
     */
    INLINE: 1,

    /**
     * Self Closing Element
     *
     * Tag will be self closing and will be preceded and followed by a new line character.
     *
     * <pre>
     *   [SIBLING]
     *   &lt;TAG /&gt;
     *   [SIBLING]
     * </pre>
     */
    SELF_CLOSING: 2,

    META: 3,

    /**
     * Inline Block Element
     *
     * Opening tag, closing tag, and inner content will be on one line, but the whole element will will be preceded and
     * followed by a new line character.
     * <pre>
     *   [SIBLING]
     *   &lt;TAG&gt;[INNER CONTENT]&lt;/TAG&gt;
     *   [SIBLING]
     * </pre>
     */
    INLINE_BLOCK:      4,
    META_SELF_CLOSING: 5
  };
